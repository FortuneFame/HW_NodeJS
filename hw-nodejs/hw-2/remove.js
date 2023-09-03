const fs = require('fs');
const path = './fs_test_directory/';

fs.readdir(path, (err, files) => {
    if (err) throw err;
    
    if (!files.length) {
        return console.log('directory already clear');
    }

    files.forEach(file => {
        if (!file.endsWith('.html')) {
            fs.unlink(path + file, err => {
                if (err) throw err;
            });
        }
    });

    console.log('remove done');
});