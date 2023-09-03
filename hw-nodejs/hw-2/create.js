const fs = require('fs');
const path = './fs_test_directory/';

const poem = 'Я вас любил любовь еще быть может в душе моей угасла не совсем но пусть она вас больше не тревожит Я не хочу печалить вас ничем'.split(' ');

for (let i = 0; i < 50; i++) {
  fs.writeFileSync(`${path}file${i + 1}.txt`, poem[i % poem.length]);
}

console.log('files created');
