const fs = require('fs');

const sourcePath = process.argv[2];
const destinationPath = process.argv[3];

const readStream = fs.createReadStream(sourcePath, { highWaterMark: 8 * 1024 }); // 8 kbit = 1 kbyte
const writeStream = fs.createWriteStream(destinationPath);

let totalBytes = fs.readFileSync(sourcePath).length;
let copiedBytes = 0;

const promises = [];

readStream.on('data', (chunk) => {
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            copiedBytes += chunk.length;
            process.stdout.write(`\rProgress: ${(copiedBytes / totalBytes * 100).toFixed(2)}%`);
            // console.log(`Progress: ${(copiedBytes / totalBytes * 100).toFixed(2)}%`);
            writeStream.write(chunk);
            resolve();
        }, 100);
    });

    promises.push(promise);
});

readStream.on('end', () => {
    Promise.all(promises)
        .then(() => {console.log('\nFile COPYING completed!');
    });
});

// npm run task1 <путь_к_исходному_файлу> <путь_для_копирования>
// npm run task1 1.txt 4.txt
// npm run task1 ./1.txt/ ./4.txt/