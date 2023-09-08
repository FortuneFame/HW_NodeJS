const delay = 100; 
const totalDuration = 3000; 
let elapsed = 0;

function displayProgress(progress) {
    console.clear(); 
    
    const slashes = ['LOADING.  ', 'LOADING.. ', 'LOADING...']; // ['\\', '|', '/'];
    const currentSlash = slashes[Math.floor((elapsed / delay) % slashes.length)];

    const progressBarSize = 5;
    const pizzaProgress = (progress * 10) % 1; 
    const progressChars = Math.round(pizzaProgress * progressBarSize);

    const progressBar = new Array(progressBarSize).fill(' ').map((_, index) => index < progressChars ? '⚡' : '  ');
    console.log(`\n ${Math.round(progress * 100)}% ${currentSlash} |${progressBar.join('')}| \r`)
}

const interval = setInterval(() => {
    elapsed += delay;
    const progress = elapsed / totalDuration;
    
    displayProgress(progress);

    if (progress >= 1) {
        clearInterval(interval);
        console.clear();
    }
}, delay);

// npm run task4
