// Load Chart.js
const chartScript = document.createElement('script');
chartScript.src = "https://cdn.jsdelivr.net/npm/chart.js";
document.head.appendChild(chartScript);

// Daily Data (energy & mood)
// energy(1–10) and mood(1–6).
let dailyData = [
  { date: "2025-01-01", energy: 6, mood: 6 },
  { date: "2025-01-02", energy: 8, mood: 1 },
  { date: "2025-01-03", energy: 7 },         // no mood
  { date: "2025-01-04", mood: 2 },           // no energy
  { date: "2025-01-08", energy: 5, mood: 6 },
  { date: "2025-01-12", energy: 9, mood: 5 },
  { date: "2025-01-13", energy: 4, mood: 3 },
  { date: "2025-01-15", energy: 10, mood: 5 }
];
// const { username } = require('../scripts');
//let username = window.username

const postData = {
  username:"Joe"//CHANGE THIS
}
console.log(postData)
dailyData = []

function dailyDataLoad(){
  return fetch("/api/getEnergyMood",{
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

let dominantMoodText
let weekLabelsForEnergy
let avgEnergyPerWeek

async function main(){
  let dailyData = await dailyDataLoad()
  console.log("Resolved dailyData",dailyData)

  dailyData = dailyData.energy_mood_timeline

  if (!Array.isArray(dailyData)){
    console.log("type of dailyData",typeof dailyData)
    console.log(dailyData)
    console.error("Error: dailyData is not an array! fuck you")
    return
  }
  // store sums for energy & mood + mood frequency in a single aggregator
const dailyWeeklyData = {};

// Convert date to "YYYY-Wn" week format
function getWeek(dateString) {
  let d = new Date(dateString);
  if (isNaN(d)) return null;
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  let year = d.getFullYear();
  let weekNo = Math.ceil((((d - new Date(year, 0, 1)) / 86400000) + 1) / 7);
  return `${year}-W${weekNo}`;
}

// Convert "YYYY-Wn" -> "Jan 1 - Jan 7" format
function getWeekLabelFromKey(weekKey) {
  let [year, weekNumber] = weekKey.split("-W").map(Number);
  let simpleDate = new Date(year, 0, 1 + (weekNumber - 1) * 7);
  let day = simpleDate.getDay();
  let monday = new Date(simpleDate);
  if (day !== 1) {
    monday.setDate(simpleDate.getDate() - (day === 0 ? 6 : day - 1));
  }
  let sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return `${monday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
    - ${sunday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
}

// Map numeric moods (1–6) to strings
const moodLabels = {
  1: "Great",
  2: "Good",
  3: "Neutral",
  4: "Sad",
  5: "Upset",
  6: "Irritated/Angry"
};

console.log("type of dailyData",typeof dailyData)
console.log("dailyData",dailyData)
// Aggregate data
dailyData.forEach((entry) => {
  const weekKey = getWeek(entry.date);
  if (!weekKey) return; // skip invalid date

  // If we haven't seen this week yet, initialize the aggregator
  if (!dailyWeeklyData[weekKey]) {
    dailyWeeklyData[weekKey] = {
      totalEnergy: 0,
      energyCount: 0,
      moodFrequency: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
    };
  }

  // Accumulate energy
  if (typeof entry.energy === "number") {
    dailyWeeklyData[weekKey].totalEnergy += entry.energy;
    dailyWeeklyData[weekKey].energyCount++;
  }

  // Track mood frequency if valid
  if (typeof entry.mood === "number" && moodLabels[entry.mood]) {
    dailyWeeklyData[weekKey].moodFrequency[entry.mood]++;
  }
});

// sorted weekly keys
const sortedWeeksDaily = Object.keys(dailyWeeklyData).sort();

// two arrays for the energy chart + find the most often mood for the last week
weekLabelsForEnergy = [];
avgEnergyPerWeek = [];

let lastWeekKeyDaily = sortedWeeksDaily[sortedWeeksDaily.length - 1] || null;
dominantMoodText = "No mood data";

sortedWeeksDaily.forEach((wk) => {
  // Label the chart axis with a readable date range
  weekLabelsForEnergy.push(getWeekLabelFromKey(wk));

  let data = dailyWeeklyData[wk];
  // Compute average energy
  let avgEnergy = 0;
  if (data.energyCount > 0) {
    avgEnergy = data.totalEnergy / data.energyCount;
  }
  avgEnergyPerWeek.push(avgEnergy.toFixed(1));

  // If this is the last (most recent) week, find the mood rating with highest frequency
  if (wk === lastWeekKeyDaily) {
    const freqMap = data.moodFrequency;
    let maxCount = 0;
    let bestMood = null;
    for (let rating in freqMap) {
      if (freqMap[rating] > maxCount) {
        maxCount = freqMap[rating];
        bestMood = parseInt(rating);
      }
    }
    if (bestMood && moodLabels[bestMood]) {
      dominantMoodText = moodLabels[bestMood];
    }
  }
});
}

main()

// 2) VAPE USAGE DATA (puffs & cost)
let vapeData = [
  { startDate: "2024-01-01", endDate: "2024-01-03", puffsPerVape: 400, costPerVape: 12 },
  { startDate: "2024-01-03", endDate: "2024-01-06", puffsPerVape: 500, costPerVape: 14 },
  { startDate: "2024-01-06", endDate: "2024-01-10", puffsPerVape: 600, costPerVape: 16 },
  { startDate: "2024-01-10", endDate: "2024-01-12", puffsPerVape: 300, costPerVape: 10 },
  { startDate: "2024-01-10", endDate: "2024-01-17", puffsPerVape: 700, costPerVape: 27 },
  { startDate: "2024-01-18", endDate: "2024-01-20", puffsPerVape: 450, costPerVape: 15 },
  { startDate: "2024-01-19", endDate: "2024-01-25", puffsPerVape: 350, costPerVape: 12 }
];

vapeData = []

function timelineload(){
  return fetch("/api/gettimeline",{
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
let timelinetemp;
async function main2(){
  timelinetemp = await timelineload()

  timelinetemp = timelinetemp.timeline
}

main2()

function vape_brand_load(){
  return fetch("/api/getvapebrands",{
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

let vape_brand_temp;

async function main3(){
  vape_brand_temp = await vape_brand_load()
  vape_brand_temp = vape_brand_temp.vape_brands

  timelinetemp.forEach(function(iterator,index){
    let poopoo = {
      startDate:iterator.start_date,
      endDate:iterator.end_date
    }
    vape_brand_temp.forEach(function(jterator,jndex){
      if (iterator.brand_id == jterator.brand_name){
        poopoo.puffsPerVape = jterator.totalPuffs
        poopoo.costPerVape = jterator.price
      }
    })
  
    vapeData.push(poopoo)
    
  })
}


main3()


console.log(vapeData)

const vapeWeeklyData = {}; // aggregator for vape usage

vapeData.forEach(session => {
  let start = new Date(session.startDate);
  let end = new Date(session.endDate);
  let totalDays = ((end - start) / (1000 * 60 * 60 * 24)) + 1;
  let dailyPuffs = session.puffsPerVape / totalDays;
  let dailyCost = session.costPerVape / totalDays;

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    let weekKey = getWeek(d);
    if (!vapeWeeklyData[weekKey]) {
      vapeWeeklyData[weekKey] = { totalPuffs: 0, totalCost: 0, count: 0 };
    }
    vapeWeeklyData[weekKey].totalPuffs += dailyPuffs;
    vapeWeeklyData[weekKey].totalCost += dailyCost;
    vapeWeeklyData[weekKey].count++;
  }
});

//  vape usage data for charts
const vapeWeekKeys = Object.keys(vapeWeeklyData).sort();
const weeksForVape = vapeWeekKeys.map(k => getWeekLabelFromKey(k));
const totalPuffsPerWeek = vapeWeekKeys.map(week => vapeWeeklyData[week].totalPuffs);
const totalCostPerWeek = vapeWeekKeys.map(week => vapeWeeklyData[week].totalCost);

// Percentage change function
function calculateChange(current, previous) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

// Compare last and second-last for puffs/cost changes
let lastPuffs = totalPuffsPerWeek.at(-1);
let prevPuffs = totalPuffsPerWeek.at(-2) || lastPuffs;
let puffsChange = calculateChange(lastPuffs, prevPuffs);

let lastCost = totalCostPerWeek.at(-1);
let prevCost = totalCostPerWeek.at(-2) || lastCost;
let costChange = calculateChange(lastCost, prevCost);

// 1) Mood insight for daily data
const moodInsightEl = document.getElementById("mood-insight");
if (moodInsightEl) {
  moodInsightEl.innerHTML = `
    <p>The emotion you felt most often this week was: 
       <span class="insights-highlight">${dominantMoodText}</span>
    </p>`;
}

// 2) Vape usage insights
document.getElementById("insights").innerHTML = `
  <p>Your vape usage ${puffsChange > 0 ? "increased" : "decreased"} by 
     <span class="insights-highlight ${puffsChange > 0 ? "increase" : "decrease"}">
       ${Math.abs(puffsChange).toFixed(1)}%
     </span> compared to last week.
  </p>
  <p>Your spending ${costChange > 0 ? "increased" : "decreased"} by 
     <span class="insights-highlight ${costChange > 0 ? "increase" : "decrease"}">
       $${Math.abs(lastCost - prevCost).toFixed(2)}
     </span> compared to last week.
  </p>
`;

// 3) Yearly savings if cost decreased
if (costChange < 0) {
  let weeklySavings = Math.abs(lastCost - prevCost);
  let yearlySavings = weeklySavings * 52;
  document.getElementById("savings-prediction").innerHTML = `
    If you keep this up, your estimated savings for the year is
    <span class="insights-highlight decrease">$${yearlySavings.toFixed(2)}</span>.
  `;
}

// make the charts
window.onload = function () {
  // Puffs per week (line chart)
  new Chart(document.getElementById("puffsChart").getContext("2d"), {
    type: "line",
    data: {
      labels: weeksForVape,
      datasets: [
        {
          label: "Puffs Per Week",
          data: totalPuffsPerWeek,
          borderColor: "#ff656a",
          backgroundColor: "rgba(138, 43, 226, 0.2)",
          fill: false
        }
      ]
    }
  });

  // Cost per week (bar chart)
  new Chart(document.getElementById("costChart").getContext("2d"), {
    type: "bar",
    data: {
      labels: weeksForVape,
      datasets: [
        {
          label: "Dollars Spent Per Week",
          data: totalCostPerWeek,
          backgroundColor: "#ff656a"
        }
      ]
    }
  });

  // Energy chart (daily data)
  const energyCtx = document.getElementById("energyChart")?.getContext("2d");
  if (energyCtx) {
    new Chart(energyCtx, {
      type: "line",
      data: {
        labels: weekLabelsForEnergy,
        datasets: [
          {
            label: "Average Energy Per Week",
            data: avgEnergyPerWeek,
            borderColor: "#ff656a",
            backgroundColor: "rgba(255, 101, 106, 0.2)",
            fill: false
          }
        ]
      },
      options: {
        scales: {
          y: {
            min: 0,
            max: 10
          }
        }
      }
    });
  }
};
