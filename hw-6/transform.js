const { Transform } = require('stream');

class CallbackTransform extends Transform { 
    constructor(callback, options = {}) {
        super(options);
        this.callback = callback;
        this.bufferSize = options.highWaterMark; 
    };

    _transform(chunk, encoding, callback) {
        try {
            // Применяем callback к чанку
            let result = this.callback(chunk.toString());

            if (result.length > this.bufferSize) {
                // Выводим предупреждение в консоль с обрезанными данными
                console.warn('⛔️ Обрезанные данные:', result.slice(this.bufferSize), '\n');
            
                // Обрезаем результат до размера буфера
                result = result.slice(0, this.bufferSize);
            }

            // Выводим результат трансформации
            this.push('✅ Результат трансформации: ' + result + '\n\n');
            callback();
        }
        catch (err) {
            callback(err);
        };
    };
};

const transforming = new CallbackTransform(chunk => {
    return chunk.toUpperCase();
}, { highWaterMark: 5 });

process.stdin.pipe(transforming).pipe(process.stdout);

// Я решила использовать прямое взаимодействие с терминалом с помощью process.stdin.
// Пожалуйста, после вызова скрипта, введите данные и нажмите ENTER

// npm run task3
// node transform.js