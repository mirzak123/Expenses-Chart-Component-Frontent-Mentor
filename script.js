const totalSpendingElement = document.querySelector('.spending');
const chartBarWrappers = document.querySelectorAll('.chart__bar-wrapper');
const chartBars = [...document.querySelectorAll('.bar')];
const chartPopups = [...document.querySelectorAll('.bar-wrapper__bar-popup')];

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

    chartBarWrappers.forEach((barWrapper, index) => {
        const bar = barWrapper.querySelector('.bar');
        const popup = barWrapper.querySelector('.bar-wrapper__bar-popup');
        
        const amount = spendings[index].amount;
        popup.textContent = `\$${amount.toFixed(2)}`;
        const height = amount / maxSpending * maxHeight;
        bar.style.height = `${height}px`;

        if (amount === maxSpending)
            bar.style.background = `hsl(186, 34%, 60%)`;

        let barWrapperOffset = barWrapper.getBoundingClientRect();
        let barOffset = bar.getBoundingClientRect();

        console.log('wrapper', barWrapperOffset.top);
        console.log('bar', barOffset.top);
        popup.style.top = `${barOffset.top - barWrapperOffset.top - 40}px`;
    });
}

makeChart();

