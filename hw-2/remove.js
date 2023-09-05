const fs = require('fs');

fs.readdir('./fs_test_directory', (err, files) => {
  if (err) throw err;

  if (files.length === 0) {
    console.log('Directory already clear');
    return;
  }

  files.forEach(file => {
    if (!file.includes('.html')) {
      fs.unlink(`./fs_test_directory/${file}`, (err) => {
        if (err) throw err;
      });
    }
  });

  console.log('Remove done');
});

// node remove.js 