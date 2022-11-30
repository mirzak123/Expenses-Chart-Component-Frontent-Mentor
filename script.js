const totalSpendingElement = document.querySelector('.spending');
const chartBars = [...document.querySelectorAll('.bar')];

const maxHeight = 180;

async function getData(file) {
    let blob = await fetch(file);
    let data = await blob.json();
    return data;
}

async function makeChart () {
    const spendings = await getData('./data.json');
    let totalSpending = spendings.reduce((accumulator, currentDay) => {
        return accumulator + currentDay.amount;
    }, 0);
    totalSpendingElement.textContent = `\$${totalSpending.toFixed(2)}`;
    
    const averageSpending = totalSpending / 7;
    const maxSpending = Math.max(...spendings.map((obj) => obj.amount));
    
    for (index in chartBars) {
        const amount = spendings[index].amount;
        const height = amount / maxSpending * maxHeight;
        console.log(height);
        chartBars[index].style.height = `${height}px`;

        if (amount === maxSpending)
            chartBars[index].style.background = `hsl(186, 34%, 60%)`;
    }
}

// fetch('./data.json')
//     .then(blob => blob.json())
//     .then(spendings => {
//         let totalSpending = spendings.reduce((accumulator, currentDay) => {
//             return accumulator + currentDay.amount;
//         }, 0);
//         console.log(totalSpending);
// });

makeChart();

