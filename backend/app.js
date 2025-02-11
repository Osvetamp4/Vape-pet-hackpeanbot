const express = require('express');
const app = express();
const path = require('path');
const defaultPort = 3000
require('dotenv').config(); //this activates the ability to parse the .env file
const { Vape, EnergyMood, TrackingPurchase, TrackingThrowaway } = require('./class');


//automatically parse any incoming requests into a JSON format
app.use(express.json());


//this section sets up the MongoDB connection
const { MongoClient, ServerApiVersion } = require("mongodb");

const DB_USERNAME = process.env.db_username;
const DB_PASSWORD = process.env.db_password;

const uri = "mongodb+srv://" + DB_USERNAME + ":" + DB_PASSWORD + "@vape-cluster.okno4.mongodb.net/?retryWrites=true&w=majority&appName=Vape-Cluster"

console.log(uri)

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

const database = client.db("Vape-Pet-Database");
const collection = database.collection("User-Collection");


async function run() {
    console.log(DB_USERNAME)
    console.log(DB_PASSWORD)
    try {
      // Connect the client to the server
      await client.connect();
      // Send a ping to confirm a successful connection
      //const database = client.db("Vape-Pet-Database");
      //const collection = database.collection("User-Collection");
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // We don't want the connection to immediately close so we'll just pass for now.
      return
    }
}
run().catch(console.dir);



//this section here handles all sorts of crashes and server terminations so that Mongodb shuts off gracefully.

async function gracefulShutdown(){
    await client.close();
    console.log("We are gracefully shutting down the server and the mongodb connection")
}

// This will handle kill commands, such as CTRL+C:
process.on('SIGINT', async ()=>{
    console.log("Recieved SIGINT, shutting down gracefully....")
    await gracefulShutdown()
    process.exit(0)
});
process.on('SIGTERM', async ()=>{
    console.log("Recieved SIGTERM, shutting down gracefully....")
    await gracefulShutdown()
    process.exit(0)
});
// process.on('SIGKILL', async ()=>{
//     console.log("Recieved SIGKILL, shutting down gracefully....")
//     await gracefulShutdown()
//     process.exit(0)
// });


// This will prevent dirty exit on code-fault crashes:
process.on('uncaughtException', async (err) => {
    console.error('Unhandled Exception:', err);
    await gracefulShutdown(); // Close resources like DB connections
    process.exit(1); // Exit with a failure code
});

app.post("/api/logVapeBrand", async (request,response)=>{
    const requestDoc = request.body.vape // tell the others to format the key like vape

    const requestUser = request.body.username //this is seperate from .vape

    const requestVapeName = requestDoc.name

    const requestVapePuffs = requestDoc.puffs

    const requestVapeCost = requestDoc.cost

    const filter = {username:requestUser}

    const package = {
        price:requestVapeCost,
        total_puffs:requestVapePuffs,
        brand_name:requestVapeName
    }

    const updateDoc = {//we are appending package to the timeline field in the user's document
        $push: {
            vape_brands:package
        }
    }
    const result = await collection.updateOne(filter, updateDoc);
})


//this will be used to call to log any new vape purchases
app.post("/api/logPurchase", async (request,response)=>{
    

    const requestDoc = request.body.tracking_purchase //tell the others to format the key like tracking_purchase

    //const requestDoc = new TrackingPurchase("Joe","2024-01-01",new Vape("super smokers",2500,25.50))

    const requestUser = requestDoc.username
    

    const requestDate = requestDoc.date

    const requestVape = requestDoc.vape

    const VapeName = requestVape.name

    const VapePuff = requestVape.puffs

    const VapePrice = requestVape.price

    

    const filter = {username:requestUser}

    const package = {
        brand_id:VapeName,
        start_date:requestDate,//we might convert this from string into date datatype in the User-Collections
        end_date:null
    }

    const updateDoc = {//we are appending package to the timeline field in the user's document
        $push: {
            timeline:package
        }
    }
    console.log("benchmark")
    const result = await collection.updateOne(filter, updateDoc);
    console.log("benchmark 2")
    
})

//this is to log any thrown away vapes
app.post("/api/logThrowaway", async (request,response) =>{
    const requestDoc = request.body.tracking_throwaway //tell others to format the key like tracking_purchase
    //const requestDoc = new TrackingThrowaway("Joe","2024-01-23")
    
    const requestUser = requestDoc.username

    const requestDate = requestDoc.date

    const filter = {username:requestUser}

    const getlength = await collection.aggregate([
        {
          $match: { username: requestUser }  // Optional: Match the document by username or any condition
        },
        {
          $project: {
            timelineLength: { $size: "$timeline" }  // Get the length of the 'timeline' array
          }
        }
      ]).toArray();
      
      // Result will contain the length of the timeline array
    const arrayLength = getlength[0].timelineLength - 1 + "";

    const finishedString = "timeline." + arrayLength + ".end_date"
    console.log(finishedString)
    

    const updateDoc = {
        $set: {
            [finishedString]:requestDate
        }
    }
    const result = await collection.updateOne(filter, updateDoc);
})

//this is to log the user's daily energy and mood
app.post("/api/logEnergyMood", async (request, response)=> {
    const requestDoc = request.body.energy_mood
    //const requestDoc = new EnergyMood(1,2,"2025-1-23","Joe")

    const requestEnergy = requestDoc.energy
    const requestMood = requestDoc.mood
    const requestDate = requestDoc.date
    const requestUser = requestDoc.username
    const requestYN = requestDoc.yesOrno

    const filter = {username:requestUser}

    const package = {
        date:requestDate,
        mood:requestMood,
        energy:requestEnergy,
        didVape:requestYN
    }

    const updateDoc = {
        $push: {
            energy_mood_timeline:package
        }
    }

    const result = await collection.updateOne(filter, updateDoc)
})

app.post("/api/updateusers", async (request,response)=>{

    const requestUser = request.body.new_name
    loopThroughDocuments(requestUser)

})

async function loopThroughDocuments(username) {
    const cursor = await collection.find();
    for (let iterator in cursor){
        if (iterator.username == username) return true
    }
    collection.insertOne({
        username:username,
        timeline:[],
        vape_brands:[],
        energy_mood_timeline:[]

    })
    
}
// getting the vape brands inputted by that one specific user
app.post("/api/getvapebrands", async (request,response)=>{
    const requestUser = request.body.username
    const query = await collection.findOne({username:requestUser})
    const bd = query.vape_brands
    response.json({
        vape_brands:bd
    })
})

// getting the timeline (all start and end dates) for one given user
app.post("/api/gettimeline",async (request,response)=> {
    const requestUser = request.body.username
    
    const query = await collection.findOne({username:requestUser})
    const tl = query.timeline
    response.json({
        timeline:tl
    })
})

app.post("/api/getEnergyMood", async (request, response)=> {
    console.log("benchmark 1")
    const requestUser = request.body.username
    console.log("benchmark 2")
    const query = await collection.findOne({username:requestUser})
    const em = query.energy_mood_timeline
    console.log(`loggin em: ${em}`)
    response.json({
        energy_mood_timeline:em
    })
})


//THIS IS AN EXAMPLE API ROUTE
//serve the index.html file which is the entry point for our React app

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname,'../','frontend','index.html'),(err)=>{
//         if (err){res.status(404).send("File not found");}
//     });
// });
//app.use(express.static('frontend'));
app.use(express.static(path.join(__dirname, '../frontend')));


//WARNING WE WILL NEED TO DEFINETELY CREATE API ROUTES TO SERVE THE HTML FILES




app.listen(defaultPort, () => console.log("Backend is running on http://localhost:3000"));