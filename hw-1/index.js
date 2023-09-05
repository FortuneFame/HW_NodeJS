const figlet = require('figlet');

async function printMessage() {
    let chalk;

    try {
        chalk = await import('chalk');
    } catch (err) {
        console.error("Error importing 'chalk':", err);
        return;
    }

    const colors = [
        chalk.default.black.bold.bgRed,
        chalk.default.black.italic.bgYellow,
        chalk.default.black.bold.bgGreen,
        chalk.default.black.italic.bgBlue,
        chalk.default.black.bold.bgMagenta,
        chalk.default.black.italic.bgWhite,
        chalk.default.black.bold.bgCyan
    ];

    const padding = 2;

    const colorizeMessage = (msg) => {
        return msg.split('')
            .map((char, index) => {
                const paddedChar = ' '.repeat(padding) + char + ' '.repeat(padding);
                return colors[index % colors.length](paddedChar);
            })
            .join('');
    }

    const arg1 = process.argv[2];
    const message = process.argv[3] || 'No message provided';

    if (arg1 === '666') {
        console.log('production mode');
    } else if (parseInt(arg1, 10) % 2 === 0) {
        console.log(colorizeMessage(message));
    } else {
        console.log(figlet.textSync(message));
    }
}

printMessage();