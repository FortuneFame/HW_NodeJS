const fs = require('fs');

const filePath = process.argv[2];
const encodingPath = process.argv[3];

const decodingMap = {};

const encodingData = fs.readFileSync(encodingPath).toString();

const encodingLines = encodingData.trim().split('\n');

encodingLines.forEach(line => {
    const [key, value] = line.split(':');
    decodingMap[value.trim()] = key.trim();  
});

const data = fs.readFileSync(filePath).toString();

let decodedData = '';
for (let symbol of data) {
    decodedData += decodingMap[symbol] || symbol;
}

fs.writeFileSync(filePath, decodedData);

console.log('\nFile DECODING completed!');

// npm run task3 <путь_к_файлу_для_раскодирования> <путь_к_файлу_таблицы_кодировки>
// npm run task3 1.txt 4.txt
// npm run task3 ./1.txt/ ./4.txt/