const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const uncompress = (output, rl, callback) => {
    const requestInputPath = () => {
        rl.question('Введите путь к файлу для декомпрессии (*.gz): ', (inputPath) => {
            if (!inputPath.endsWith('.gz')) {
                output('Неверное расширение файла. Пожалуйста, укажите имя файла, заканчивающееся на .gz');
                requestInputPath();
            } else {
                fs.access(inputPath, fs.constants.F_OK, (err) => {
                    if (err) {
                        output('Файл не найден. Попробуйте снова.');
                        requestInputPath();
                    } else {
                        requestOutputPath(inputPath);
                    }
                });
            }
        });
    };

    const requestOutputPath = (inputPath) => {
        rl.question('Введите путь для сохранения распакованного файла: ', (outputPath) => {
            if (!outputPath || outputPath.trim() === '') {
                outputPath = path.join(path.dirname(inputPath), path.basename(inputPath, '.gz'));
            }

            const inputStream = fs.createReadStream(inputPath);
            const gunzip = zlib.createUnzip();
            const outputStream = fs.createWriteStream(outputPath);

            output('Декомпрессия файла...');

            inputStream.pipe(gunzip).pipe(outputStream).on('finish', () => {
                output('Файл успешно распакован.');
                callback();
            });
        });
    };

    requestInputPath();
};

module.exports = { uncompress };
