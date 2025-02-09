class Vape {
    constructor(name,puffs,cost){
        this.name = name
        this.puffs = puffs
        this.cost = cost
    }

    name;
    puffs;
    cost;
}

class EnergyMood {
    constructor(energy, mood, date, username) {
        this.date = date;
        this.energy = energy;
        this.mood = mood;
        this.username = username
    }
    energy;
    mood;
    date;
    username;
}

class TrackingPurchase {
    constructor(username, date, vape) {
        this.date = date
        this.vape = vape;
        this.username = username;
    }
    date;
    username;
    vape;  //vape class to call back
}

class TrackingThrowaway {
    constructor(username, date) {
        this.username = username;
        this.date = date;
    }
    date;
    username;
}

module.exports = {
    Vape,
    EnergyMood,
    TrackingPurchase,
    TrackingThrowaway
};