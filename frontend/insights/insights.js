// Load Chart.js
const chartScript = document.createElement('script');
chartScript.src = "https://cdn.jsdelivr.net/npm/chart.js";
document.head.appendChild(chartScript);

// Vape usage data
const vapeData = [
    { startDate: "2024-01-01", endDate: "2024-01-03", puffsPerVape: 400, costPerVape: 12, mood: Mood.Happy },
    { startDate: "2024-01-03", endDate: "2024-01-06", puffsPerVape: 500, costPerVape: 14, mood: Mood.Neutral },
    { startDate: "2024-01-06", endDate: "2024-01-10", puffsPerVape: 600, costPerVape: 16, mood: Mood.Sad },
    { startDate: "2024-01-10", endDate: "2024-01-12", puffsPerVape: 300, costPerVape: 10, mood: Mood.Happy },
    { startDate: "2024-01-10", endDate: "2024-01-17", puffsPerVape: 700, costPerVape: 27, mood: Mood.Neutral },
    { startDate: "2024-01-18", endDate: "2024-01-20", puffsPerVape: 450, costPerVape: 15, mood: Mood.Sad },
    { startDate: "2024-01-19", endDate: "2024-01-25", puffsPerVape: 350, costPerVape: 12, mood: Mood.Neutral }
];

// Convert date to week format
function getWeek(date) {
    let d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    let year = d.getFullYear();
    let weekNo = Math.ceil((((d - new Date(year, 0, 1)) / 86400000) + 1) / 7);
    return `${year}-W${weekNo}`;
}

// Convert week keys to readable date ranges
function getWeekLabelFromKey(weekKey) {
    let [year, weekNumber] = weekKey.split("-W").map(Number);
    let simpleDate = new Date(year, 0, 1 + (weekNumber - 1) * 7);
    let day = simpleDate.getDay();
    let monday = new Date(simpleDate);
    if (day !== 1) monday.setDate(simpleDate.getDate() - (day === 0 ? 6 : day - 1));
    let sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return `${monday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${sunday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
}

// Organize weekly data
const weeklyData = {};
vapeData.forEach(session => {
    let start = new Date(session.startDate);
    let end = new Date(session.endDate);
    let totalDays = ((end - start) / (1000 * 60 * 60 * 24)) + 1;
    let dailyPuffs = session.puffsPerVape / totalDays;
    let dailyCost = session.costPerVape / totalDays;
    let dailyMood = session.mood;

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        let weekKey = getWeek(d);
        if (!weeklyData[weekKey]) {
            weeklyData[weekKey] = { totalPuffs: 0, totalCost: 0, totalMood: 0, count: 0 };
        }
        weeklyData[weekKey].totalPuffs += dailyPuffs;
        weeklyData[weekKey].totalCost += dailyCost;
        weeklyData[weekKey].totalMood += dailyMood;
        weeklyData[weekKey].count++;
    }
});

// Format data for charts
const weekKeys = Object.keys(weeklyData).sort();
const weeks = weekKeys.map(getWeekLabelFromKey);
const totalPuffsPerWeek = weekKeys.map(week => weeklyData[week].totalPuffs);
const totalCostPerWeek = weekKeys.map(week => weeklyData[week].totalCost);
const avgMoodPerWeek = weekKeys.map(week => (weeklyData[week].totalMood / weeklyData[week].count).toFixed(1));

// Calculate percentage change
function calculateChange(current, previous) {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
}

let lastPuffs = totalPuffsPerWeek.at(-1);
let prevPuffs = totalPuffsPerWeek.at(-2) || lastPuffs;
let puffsChange = calculateChange(lastPuffs, prevPuffs);

let lastCost = totalCostPerWeek.at(-1);
let prevCost = totalCostPerWeek.at(-2) || lastCost;
let costChange = calculateChange(lastCost, prevCost);

// Update insights
document.getElementById("insights").innerHTML = `
    <p>Your vape usage ${puffsChange > 0 ? "increased" : "decreased"} by 
    <span class="insights-highlight ${puffsChange > 0 ? "increase" : "decrease"}">
    ${Math.abs(puffsChange).toFixed(1)}%</span> compared to last week.</p>
    <p>Your spending ${costChange > 0 ? "increased" : "decreased"} by 
    <span class="insights-highlight ${costChange > 0 ? "increase" : "decrease"}">
    $${Math.abs(lastCost - prevCost).toFixed(2)}</span> compared to last week.</p>
`;

// Predict yearly savings if spending decreased
if (costChange < 0) {
    let weeklySavings = Math.abs(lastCost - prevCost);
    let yearlySavings = weeklySavings * 52;
    document.getElementById("savings-prediction").innerHTML = `
        If you keep this up, your estimated savings for the year is 
        <span class="insights-highlight decrease">$${yearlySavings.toFixed(2)}</span>.
    `;
}

// Generate charts when the page loads
window.onload = function () {
    new Chart(document.getElementById("moodChart").getContext("2d"), {
        type: "line",
        data: { 
            labels: weeks, 
            datasets: [{ 
                label: "Mood Over Time", 
                data: avgMoodPerWeek, 
                borderColor: "#a389f7", 
                backgroundColor: "rgba(163, 137, 247, 0.2)", 
                fill: false 
            }] 
        }
    });

    new Chart(document.getElementById("puffsChart").getContext("2d"), {
        type: "line",
        data: { 
            labels: weeks, 
            datasets: [{ 
                label: "Puffs Per Week", 
                data: totalPuffsPerWeek, 
                borderColor: "#a389f7", 
                backgroundColor: "rgba(138, 43, 226, 0.2)", 
                fill: false 
            }] 
        }
    });

    new Chart(document.getElementById("costChart").getContext("2d"), {
        type: "bar",
        data: { 
            labels: weeks, 
            datasets: [{ 
                label: "Dollars Spent Per Week", 
                data: totalCostPerWeek, 
                backgroundColor: "#c599ff" 
            }] 
        }
    });
};
