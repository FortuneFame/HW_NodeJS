const fs = require('fs');

const filePath = process.argv[2];
const encodingPath = process.argv[3];

const encodingMap = {};

const encodingData = fs.readFileSync(encodingPath).toString();

const encodingLines = encodingData.trim().split('\n'); 

encodingLines.forEach(line => {
    const [key, value] = line.split(':');
    encodingMap[key.trim()] = value.trim();
});

const data = fs.readFileSync(filePath).toString(); 

let encodedData = '';
for (let symbol of data) {
    encodedData += encodingMap[symbol] || symbol; 
}

fs.writeFileSync(filePath, encodedData); 

console.log('\nFile ENCODING completed!');
