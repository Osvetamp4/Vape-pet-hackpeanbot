app.get("/api/getmoods",async (request, response)=> {
    const requestUser = request.body.username
    const query = await collection.findOne({username:requestUser})
    const em = query.energy_mood_timeline
})