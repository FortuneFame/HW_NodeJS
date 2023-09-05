const fs = require('fs');

const directoryPath = process.argv[2];

if (!directoryPath) {
  return console.log("Path is required");
}

fs.readdir(directoryPath, (err, files) => {
  if (err) throw err;

  console.log(files);
});

//  node list.js fs_test_directory 