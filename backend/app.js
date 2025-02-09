const express = require('express');
const app = express();
const path = require('path');
const defaultPort = 3000
require('dotenv').config(); //this activates the ability to parse the .env file


//automatically parse any incoming requests into a JSON format
app.use(express.json());


//this section sets up the MongoDB connection
const { MongoClient, ServerApiVersion } = require("mongodb");

const DB_USERNAME = process.env.db_username;
const DB_PASSWORD = process.env.db_password;

const uri = "mongodb+srv://" + DB_USERNAME + ":" + DB_PASSWORD + "@vape-cluster.okno4.mongodb.net/?retryWrites=true&w=majority&appName=Vape-Cluster"



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
    try {
      // Connect the client to the server
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // We don't want the connection to immediately close so we'll just pass for now.
      pass
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


app.post("/api/logPurchase", async (request,response)=>{
    

    const requestDoc = request.body.tracking_purchase //tell the others to format the key like tracking_purchase

    const requestUser = requestDoc.username

    const requestDate = requestDoc.date

    const requestVape = requestDoc.vape

    const VapeName = requestVape.name

    const VapePuff = requestVape.puff

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
    const result = await collection.updateOne(filter, updateDoc);

    
})

app.post("/api/logThrowaway", async (request,response) =>{
    const requestDoc = request.body.tracking_throwaway //tell others to format the key like tracking_purchase
    
    const requestUser = requestDoc.username

    const requestDate = requestDoc.date

    const filter = {username:requestUser}

    const updateDoc = {
        $set: {
            "timeline.0.end_date":requestDate
        }
    }
    const result = await collection.updateOne(filter, updateDoc);
})


app.post("/api/logEnergyMood", async (request, response)=> {
    const requestDoc = request.body.energy_mood

    const requestEnergy = requestDoc.energy
    const requestMood = requestDoc.mood
    const requestDate = requestDoc.date
    const requestUser = requestDoc.username

    const filter = {username:requestUser}

    const package = {
        date:requestDate,
        mood:requestMood,
        energy:requestEnergy
    }

    const updateDoc = {
        $push: {
            energy_mood_timeline:package
        }
    }

    const result = await collection.updateOne(filter, updateDoc)
})


// getting the vape brands inputted by that one specific user
app.get("/api/getvapebrands", async (request,response)=>{
    const requestUser = request.body.username
    const query = await collection.findOne({username:requestUser})
    const bd = query.vape_brands
    response.json({
        vape_brands:bd
    })
})

// getting the timeline (all start and end dates) for one given user
app.get("/api/gettimeline",async (request,response)=> {
    const requestUser = request.body.username
    const query = await collection.findOne({username:requestUser})
    const tl = query.timeline
    response.json({
        timeline:tl
    })
})

app.get("/api/getEnergyMood", async (request, response)=> {
    const requestUser = request.body.username
    const query = await collection.findOne({username:requestUser})
    const em = query.energy_mood_timeline
    response.json({
        energy_mood_timeline:em
    })
})


//THIS IS AN EXAMPLE API ROUTE
//serve the index.html file which is the entry point for our React app

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'frontend', 'dist', 'index.html'));
});

//WARNING WE WILL NEED TO DEFINETELY CREATE API ROUTES TO SERVE THE HTML FILES




app.listen(defaultPort, () => console.log("Backend is running on http://localhost:3000"));