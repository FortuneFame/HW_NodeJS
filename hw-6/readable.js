const { Readable } = require('stream');

class MyReadable extends Readable {
    constructor(data, options) {
        super(options);
        this.data = data; 
        this.dataIndex = 0;
        this.leftover = '';
        this.chunkCount = 0;
    };
    _read() {

        // Читаем следующий кусок
        let chunk = this.data[this.dataIndex] || '';
        
        // Если есть остаток, добавляем его к текущему
        if (this.leftover) {
            chunk = this.leftover + chunk;
            this.leftover = '';
        };

        // Если последний символ пробел, разбиваем чанк до близжайшего символа
        if (chunk.slice(-1) === ' ') {
            let lastSpaceIndex = chunk.lastIndexOf(' ', chunk.length - 2);
            if (lastSpaceIndex !== -1) {
                this.leftover = chunk.slice(lastSpaceIndex + 1);
                chunk = chunk.slice(0, lastSpaceIndex + 1);
            };
        };

        // Отправляем чанк для чтения
        this.push(chunk);
        this.dataIndex++;

        // Увеличиваем счетчик чанков и выводим
        if (chunk) {
            this.chunkCount++;
            console.log(`Chunk №${this.chunkCount}:`, chunk);
        }
        // Если достигнут конец отправляем сигнал окончания чтения
        if (this.dataIndex >= this.data.length && !this.leftover) {
            this.push(null);
        };
    };
};

const dataToRead = [
  "Text line 1 ",
  " Text line 2",
  "Text line 3 "
];

const reader = new MyReadable(dataToRead);
reader.on('data', (data) => {}); 
reader.on('end', () => {
  console.log('👍 Чтение завершено!');
});

// npm run task1
// node readable.js