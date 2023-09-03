const fs = require('fs');
const path = require('path');

const directoryPath = process.argv[2];
if (!directoryPath) {
  return console.log('path is required');
}

fs.readdir(directoryPath, (err, files) => {
  if (err) throw err;

  const fileObjects = files.map(file => {
    const filePath = path.join(directoryPath, file);
    const fileStats = fs.statSync(filePath);
    return {
      Filename: file,
      Size: fileStats.size,
      Created: fileStats.birthtime,
    };
  });

  console.table(fileObjects);
});

