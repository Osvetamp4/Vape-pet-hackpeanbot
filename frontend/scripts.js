let onboardStartBox = document.querySelector(".onboardingContainer");
let onboardQuestion1 = document.querySelector(".onboardQuestions1");
let onboardQuestion2 = document.querySelector(".onboardQuestions2");
function onboardStart() {
    onboardStartBox.style.visibility = "hidden";
    onboardQuestion1.style.display = "block";
}
let vapeCountBox = document.querySelector(".vapeCountBoxItem");
vapeCountBox.addEventListener("mouseover", () => {
    let items = document.getElementsByClassName("hoverOption");
    for (let i = 0; i < items.length; i++) {
        items[i].style.display = "block";
    }
});
vapeCountBox.addEventListener("mouseout", () => {
    let items = document.getElementsByClassName("hoverOption");
    for (let i = 0; i < items.length; i++) {
        items[i].style.display = "none";
    }
});
let purchaseCountBox = document.querySelector(".purchaseCountBoxItem");
purchaseCountBox.addEventListener("mouseover", () => {
    let items = document.getElementsByClassName("hoverOptionPurchase");
    for (let i = 0; i < items.length; i++) {
        items[i].style.display = "block";
    }
});
purchaseCountBox.addEventListener("mouseout", () => {
    let items = document.getElementsByClassName("hoverOptionPurchase");
    for (let i = 0; i < items.length; i++) {
        items[i].style.display = "none";
    }
});
let vapeDiscard = document.querySelector(".vapeType");
vapeDiscard.addEventListener("mouseover", () => {
    let items = document.getElementsByClassName("hoverOptionVapeD");
    for (let i = 0; i < items.length; i++) {
        items[i].style.display = "block";
    }
});
vapeDiscard.addEventListener("mouseout", () => {
    let items = document.getElementsByClassName("hoverOptionVapeD");
    for (let i = 0; i < items.length; i++) {
        items[i].style.display = "none";
    }
});
let vapeDiscardP = document.querySelector(".vapeTypeP");
vapeDiscardP.addEventListener("mouseover", () => {
    let items = document.getElementsByClassName("hoverOptionVapeP");
    for (let i = 0; i < items.length; i++) {
        items[i].style.display = "block";
    }
});
vapeDiscardP.addEventListener("mouseout", () => {
    let items = document.getElementsByClassName("hoverOptionVapeP");
    for (let i = 0; i < items.length; i++) {
        items[i].style.display = "none";
    }
});
function onboardEnd() {
    onboardQuestion2.style.visibility = "hidden";
}
function Q1MoveSkip() {
    onboardQuestion1.style.display = "none";
}
function Q1MoveNext() {
    onboardQuestion2.style.display = "block";
    onboardQuestion1.style.display = "none";
}

function closeP() {
    let purchaseForm = document.querySelector("#purchaseEntry");
    purchaseForm.style.display = "none";
}
function closeD() {
    let discardForm = document.querySelector(".discardEntry");
    discardForm.style.display = "none";
}

class Vape {
    name;
    puffs;
    cost;
}

//make json object to send objects to back-end!!

class EnergyMood {
    constructor(energy, mood) {
        this.energy = energy;
        this.mood = mood;
    }
    energy;
    mood;
}

class TrackingPurchase {
    constructor(username, date, mood, vape) {
        this.date = date
        this.vape = vape;
        this.username = username;
    }
    date;
    username;
    vape;  //vape class to call back
}

class TrackingThrowaway {
    constructor(username, date, mood) {
        this.username = username;
        this.date = date;
    }
    date;
    username;
}

