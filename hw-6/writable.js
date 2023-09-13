const fs = require('fs');
const { Writable } = require('stream');

class LimitedFileWriter extends Writable {
    constructor(filename, maxSize) {
        super();
        this.filename = filename;
        this.maxSize = maxSize;
        this.currentSize = 0;
        this.fileStream = fs.createWriteStream(this.filename); // Создание потока записи файла
    };

    _write(chunk, encoding, callback) {
        this.currentSize += chunk.length; // Обновляем размер записанных данных
        if (this.currentSize > this.maxSize) { // Проверяем, не превышает ли лимит
            this.fileStream.close(() => {
                fs.unlink(this.filename, err => { // Удаляем файл если он превысил лимит
                    this.destroy(); // Уничтожаем поток 
                    this.emit('error', new Error('Размер файла превышает максимальный размер ⛔️'))
                });
            });
            return;
        };
        // Записываем данные в файл
        this.fileStream.write(chunk, encoding, callback) 
    };
    // Вызывается при завершении работы потока для очистки ресурсов
    _destroy(err, callback) { 
        this.fileStream.close(() => callback(err));
    };
};

const dataToRead = [
  "Text line 1",
  "Text line 2",
  "Text line 3"
];

const writing = new LimitedFileWriter('test.txt', 50)

writing.on('error', err => {
    console.error('⚠️  Произошла ошибка:', err);
});

dataToRead.forEach(data => {
    writing.write(data + '\n');
});

writing.on('finish', () => {
    console.log('🤖 Запись данных завершена!')
})

writing.end();

// npm run task2
// node writable.js
