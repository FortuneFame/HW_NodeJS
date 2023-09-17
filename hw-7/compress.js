const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const compress = (output, rl, callback) => {
    const requestInputPath = () => {
        rl.question('Введите путь к файлу для компрессии: ', (inputPath) => {
            fs.access(inputPath, fs.constants.F_OK, (err) => {
                if (err) {
                    output('Файл не найден. Попробуйте снова.');
                    requestInputPath();
                } else {
                    requestOutputPath(inputPath);
                }
            });
        });
    };

    const requestOutputPath = (inputPath) => {
        rl.question('Введите путь для сохранения сжатого файла: ', (outputPath) => {
            if (!outputPath || outputPath.trim() === '') {
                outputPath = path.join(path.dirname(inputPath), path.basename(inputPath) + '.gz');
            } else if (!outputPath.endsWith('.gz')) {
                output('Имя файла должно заканчиваться на .gz. Пожалуйста, попробуйте снова.');
                requestOutputPath(inputPath);
                return;
            }

            const inputStream = fs.createReadStream(inputPath);
            const gzip = zlib.createGzip();
            const outputStream = fs.createWriteStream(outputPath);

            output('Компрессия файла...');

            inputStream.pipe(gzip).pipe(outputStream).on('finish', () => {
                output('Файл успешно сжат.');
                callback();
            });
        });
    };

    requestInputPath();
};

module.exports = { compress };