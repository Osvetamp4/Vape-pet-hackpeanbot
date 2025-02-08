let onboardStartBox = document.querySelector(".onboardingContainer");
let onboardQuestion1 = document.querySelector(".onboardQuestions1");
let onboardQuestion2 = document.querySelector(".onboardQuestions2");
let dashboard = document.querySelector(".dashboard")
function onboardStart() {
    onboardStartBox.style.display = "none";
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
function Q1MoveSkip() {
    onboardQuestion1.style.display = "none";
    dashboard.style.display = "flex";

}
function Q1MoveNext() {
    onboardQuestion2.style.display = "block";
    onboardQuestion1.style.display = "none";
}
let purchaseForm = document.querySelector("#purchaseEntry");
function closeP() {
    purchaseForm.style.zIndex = "0";
    purchaseForm.style.display = "none";
}
let discardForm = document.querySelector("#discardEntry");
function closeD() {
    discardForm.style.zIndex = "0";
    discardForm.style.display = "none";
}
function discardEntry() {
    discardForm.style.display = "flex";
    console.log(discardForm.style.zIndex);
    discardForm.style.zIndex = "5";
}
function purchaseEntry() {
    purchaseForm.style.display = "flex";
    purchaseForm.style.zIndex = "5";
}
let logForm = document.querySelector("#logEntry");
function logEntry() {
    logForm.style.display = "flex";
    logForm.style.zIndex = "5";
}
function closeL() {
    logForm.style.display = "none";
    logForm.style.zIndex = "0";
}
function onboardEnd() {
    onboardQuestion2.style.display = "none";
    dashboard.style.display = "flex";
}
const Mood = {
    Happy: 2,
    Neutral: 1,
    Sad: 0
}


class Vape {
    name;
    puffs;
    cost;
}

//make json object to send objects to back-end!!

class TrackingPurchase {
    constructor(date, mood, vape) {
        this.date = date
        this.mood = mood;
        this.vape = vape;
    }
    date;
    mood;  //mood enum
    vape;  //vape class to call back
}

class TrackingThrowaway {
    constructor(date, mood) {
        this.date = date;
        this.mood = mood;
    }
    date;
    mood; //mood enum
}

