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