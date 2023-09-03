const fs = require('fs').promises;
const path = './fs_test_directory/';

fs.readdir(path)
  .then(files => {
    const txtFiles = files.filter(file => file.endsWith('.txt'));
    return Promise.all(txtFiles.map(file => {
      const randomDigit = `${Math.floor(Math.random() * 10)}`;
      return fs.appendFile(path + file, randomDigit);
    }));
  })
  .then(() => console.log('append done'))
  .catch(err => console.error(err));