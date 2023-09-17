const { Readable } = require('stream');
 
class MyReadable extends Readable {
    constructor(dataStr, options) {
        super(options);
        this.dataStr = dataStr; 
        this.dataIndex = 0;
        this.leftover = '';
        this.chunkCount = 0;
    };
 
    _read() {
        const chunkSize = this.readableHighWaterMark;
        let chunk = this.dataStr.substring(this.dataIndex, this.dataIndex + chunkSize - this.leftover.length);
 
        if (this.leftover) {
            chunk = this.leftover + chunk;
            this.leftover = '';
        };
 
        const trailingSpaces = /\s+$/;
        const spaceMatch = chunk.match(trailingSpaces);
 
        if (spaceMatch) {
            if (spaceMatch.index === 0) {
                chunk = '';
                this.leftover = chunk;
            } else {
                this.leftover = chunk.substring(spaceMatch.index);
                chunk = chunk.substring(0, spaceMatch.index);
            };
        };
 
        this.dataIndex += chunkSize;
 
        if (chunk) {
            this.chunkCount++;
            console.log(`Chunk № ${this.chunkCount}:`, `|${chunk}|`);
        };
 
        this.push(chunk);
 
        if (this.dataIndex >= this.dataStr.length && !this.leftover) {
            this.push(null);
        };
    };
};
 
const dataToRead = '   dfgdfgdfg                 dfgf  fdg dsfg dfg dfg dfg dfg   ffdfffffffffffff ';
 
const reader = new MyReadable(dataToRead, { highWaterMark: 8 });
reader.on('data', (data) => {}); 
reader.on('end', () => {
    console.log('👍 Чтение завершено!');
});

// npm run task1
// node readable.js
