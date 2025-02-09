let onboardStartBox = document.querySelector(".onboardingContainer");
let onboardQuestion1 = document.querySelector(".onboardQuestions1");
let onboardQuestion2 = document.querySelector(".onboardQuestions2");
let dashboard = document.querySelector(".dashboard")
let startName = document.querySelector(".onboardStartName");
window.currentNumber = 1
window.currentMood = 1
window.username = undefined
function onboardStart() {
    onboardStartBox.style.display = "none";
    onboardQuestion1.style.display = "block";
    window.username = startName.value;
    document.getElementById("nameofuser").innerHTML = `Hey ${window.username},`

    const postData = {
        new_name:window.username
    }

    fetch("/api/updateusers",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(postData)
      })
      .then(response =>{
        if (!response.ok){
            throw new Error('Network response was not ok.')
            
        }
        return response.json()
      })
      .catch(error => {
        console.error('Error:', error);      // Handle any errors
      });

}


let items = document.getElementsByClassName("hoverOption");
let vapeCountBox = document.querySelector(".test");
vapeCountBox.addEventListener("mouseover", () => {
    for (let i = 0; i < items.length; i++) {
        items[i].style.display = "flex";
        items[i].style.zIndex = "6";
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
        valueHolderP.style.border = "0";
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
let newThing = document.querySelector("#newEntry");
let vapeDiscardP = document.querySelector(".vapeTypeP");
vapeDiscardP.addEventListener("mouseover", () => {
    let items = document.getElementsByClassName("hoverOptionVapeP");
    for (let i = 0; i < items.length; i++) {
        items[i].style.display = "flex";
    }

    newThing.style.visibility = "hidden";
});
vapeDiscardP.addEventListener("mouseout", () => {
    let items = document.getElementsByClassName("hoverOptionVapeP");
    for (let i = 0; i < items.length; i++) {
        items[i].style.display = "none";
    }
    newThing.style.visibility = "visible";
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
    let puffInput = document.getElementsByClassName("vapePuffNumberInput").value
    let vapeCostInput = document.getElementsByClassName("vapePurchaseCostInput").value
    let vapeNameInput = document.getElementById("newEntry").value
    let currentDate = new Date();
    let year = currentDate.getFullYear(); // Get the year
    let month = currentDate.getMonth() + 1; // Get the month (Note: months are 0-indexed)
    let day = currentDate.getDate(); // Get the day of the month
    const dateString = year + "-" + day + "-" + month
    const vapeobj = new Vape(vapeNameInput,puffInput,vapeCostInput)
    const tempPurchase = new TrackingPurchase(window.username,dateString,vapeobj)
    const postData = {
        tracking_purchase:tempPurchase
    }

    fetch("/api/logPurchase",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(postData)
      })
      .then(response =>{
        if (!response.ok){
            throw new Error('Network response was not ok.')
            
        }
        return response.json()
      })
      .catch(error => {
        console.error('Error:', error);      // Handle any errors
      });
}
let discardForm = document.querySelector("#discardEntry");
function submitD() {
    discardForm.style.zIndex = "0";
    discardForm.style.display = "none";
    let currentDate = new Date();
    let year = currentDate.getFullYear(); // Get the year
    let month = currentDate.getMonth() + 1; // Get the month (Note: months are 0-indexed)
    let day = currentDate.getDate(); // Get the day of the month
    const dateString = year + "-" + day + "-" + month
    const tempThrowaway = new TrackingThrowaway(window.username,dateString)

    const postData = {
        tracking_throwaway:tempThrowaway
    }
    fetch("/api/logThrowaway",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(postData)
      })
      .then(response =>{
        if (!response.ok){
            throw new Error('Network response was not ok.')
            
        }
        return response.json()
      })
      .catch(error => {
        console.error('Error:', error);      // Handle any errors
      });
}

function submitL() {
    closeL();
    let currentDate = new Date();
    let year = currentDate.getFullYear(); // Get the year
    let month = currentDate.getMonth() + 1; // Get the month (Note: months are 0-indexed)
    let day = currentDate.getDate(); // Get the day of the month
    const dateString = year + "-" + day + "-" + month
    const tempEnergyMood = new EnergyMood(window.currentNumber,window.currentMood,dateString,window.username)

    const postData = {
        energy_mood:tempEnergyMood
    }

    fetch("/api/logEnergyMood",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(postData)
      })
      .then(response =>{
        if (!response.ok){
            throw new Error('Network response was not ok.')
            
        }
        return response.json()
      })
      .catch(error => {
        console.error('Error:', error);      // Handle any errors
      });
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
    vOptions[0].style.backgroundColor = "#f6f1ea";
    vOptions[1].style.backgroundColor = "#f6f1ea";
    for (let i = 0; i < emotions.length; i++) {
        emotions[i].style.border = "0";
    }
    for (let i = 0; i < energyLevel.length; i++) {
        energyLevel[i].style.backgroundColor = " #f6f1ea";
    }
    for (let i = 0; i < symptoms.length; i++) {
        symptoms[i].style.border = "0";
    }

}
function onboardEnd() {
    onboardQuestion2.style.display = "none";
    dashboard.style.display = "flex";
}

let vOptions = document.getElementsByClassName("vOption");
for (let i = 0; i < vOptions.length; i++) {
    vOptions[i].addEventListener("click", () => {
        vOptions[0].style.backgroundColor = "#f6f1ea";
        vOptions[1].style.backgroundColor = "#f6f1ea";
        vOptions[i].style.backgroundColor = "#fed700";
    });
}
let emotions = document.getElementsByClassName("feelingOption");
for (let i = 0; i < emotions.length; i++) {
    emotions[i].addEventListener("click", () => {
        for (let i = 0; i < emotions.length; i++) {
            emotions[i].style.border = "0";
        }
        emotions[i].style.border = "black 1px solid";
    })
}
let symptoms = document.getElementsByClassName("symptomOption");
for (let i = 0; i < symptoms.length; i++) {
    symptoms[i].addEventListener("click", () => {
        for (let i = 0; i < symptoms.length; i++) {
            symptoms[i].style.border = "0";
        }
        symptoms[i].style.border = "black 1px solid";
    });


}
let energyLevel = document.getElementsByClassName("energyOption");
for (let i = 0; i < energyLevel.length; i++) {
    energyLevel[i].addEventListener("click", () => {
        for (let i = 0; i < energyLevel.length; i++) {
            energyLevel[i].style.backgroundColor = " #f6f1ea";
        }
        energyLevel[i].style.backgroundColor = "#fed700";
    });
}
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
let slider = document.querySelector(".slider");
let sliderDisplay = document.querySelector(".sliderValue");
slider.oninput = function () {
    sliderDisplay.style.visibility = "visible";
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

const sliderthing = document.querySelector(".slider");

function updateSliderFill() {
    const value = sliderthing.value;
    const min = sliderthing.min;
    const max = sliderthing.max;
    const percentage = ((value - min) / (max - min)) * 100;

    sliderthing.style.background = `linear-gradient(to right, #ff656a ${percentage}%, #ddd ${percentage}%)`;
}

updateSliderFill();

sliderthing.addEventListener("input", updateSliderFill)