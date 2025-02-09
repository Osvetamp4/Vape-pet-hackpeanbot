let onboardStartBox = document.querySelector(".onboardingContainer");
let onboardQuestion1 = document.querySelector(".onboardQuestions1");
let onboardQuestion2 = document.querySelector(".onboardQuestions2");
let dashboard = document.querySelector(".dashboard")
let startName = document.querySelector(".onboardStartName");
let username
function onboardStart() {
    onboardStartBox.style.display = "none";
    onboardQuestion1.style.display = "block";
    username = startName.value;
}
let items = document.getElementsByClassName("hoverOption");
let vapeCountBox = document.querySelector(".test");
vapeCountBox.addEventListener("mouseover", () => {
    for (let i = 0; i < items.length; i++) {
        items[i].style.display = "flex";
    }
});
vapeCountBox.addEventListener("mouseout", () => {
    let items = document.getElementsByClassName("hoverOption");
    for (let i = 0; i < items.length; i++) {
        items[i].style.display = "none";
    }
});
let valueHolder = document.querySelector(".valueHolder");
for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", () => {
        valueHolder.innerHTML = items[i].innerHTML;
        valueHolder.style.border = "0";
        for (let i = 0; i < items.length; i++) {
            items[i].style.display = "none";
        }
    });
}
let itemsP = document.getElementsByClassName("hoverOptionPurchase");
let valueHolderP = document.querySelector(".valueHolderP")
for (let i = 0; i < itemsP.length; i++) {
    itemsP[i].addEventListener("click", () => {
        valueHolderP.innerHTML = itemsP[i].innerHTML;
        valueHolder.style.border = "black 1px solid";
        for (let i = 0; i < itemsP.length; i++) {
            itemsP[i].style.display = "none";
        }
    });
}
let purchaseCountBox = document.querySelector(".pBox");
purchaseCountBox.addEventListener("mouseover", () => {
    let items = document.getElementsByClassName("hoverOptionPurchase");
    for (let i = 0; i < items.length; i++) {
        items[i].style.display = "flex";
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
        items[i].style.display = "flex";
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
        items[i].style.display = "flex";
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
    if (valueHolder.innerHTML == "") {
        valueHolder.style.border = "red 1px solid";
        window.alert("Fill in the empty fields!")
    } else if (valueHolderP.innerHTML == "") {
        valueHolderP.style.border = "red 1px solid";
        window.alert("Fill in the empty fields!")
    }
    else {
        onboardQuestion2.style.display = "flex";
        onboardQuestion1.style.display = "none";
    }
}
let purchaseForm = document.querySelector("#purchaseEntry");
function closeP() {
    purchaseForm.style.zIndex = "0";
    purchaseForm.style.display = "none";
}
function submitP() {
    purchaseForm.style.zIndex = "0";
    purchaseForm.style.display = "none";
    //add object creation based on things
}
let discardForm = document.querySelector("#discardEntry");
function submitD() {
    discardForm.style.zIndex = "0";
    discardForm.style.display = "none";
    //add object creation based on things
}
function closeD() {
    discardForm.style.display = "none";
    discardForm.style.zIndex = "0";
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

let emotionOptions = document.getElementsByClassName("")

class Vape {
    name;
    puffs;
    cost;
}
let slider = document.querySelector(".slider");
let sliderDisplay = document.querySelector(".sliderValue");
slider.oninput = function () {
    sliderDisplay.innerHTML = this.value;
}
//make json object to send objects to back-end!!

class EnergyMood {
    constructor(energy, mood, date, username) {
        this.date = date;
        this.energy = energy;
        this.mood = mood;
        this.username = username;

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
