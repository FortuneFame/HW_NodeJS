const fs = require('fs');

const poem = "Я вас любил любовь еще быть может в душе моей угасла не совсем но пусть она вас больше не тревожит Я не хочу печалить вас ничем".split(' '); 

for (let i = 0; i < 50; i++) {
  const word = poem[i % poem.length];
  fs.writeFileSync(`./fs_test_directory/file${i + 1}.txt`, word);
}

console.log('Files created');

//  node create.js 