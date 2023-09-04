const EventEmitter = require('events');

class Ticker extends EventEmitter {
    constructor() {
        super();
        setInterval(() => this.emit('week'), 5000);
        setInterval(() => this.emit('month'), 10000);
        setInterval(() => this.emit('year'), 15000);
    };
};

global.ticker = new Ticker();

global.ticker.setMaxListeners(100);
// (node:17612) MaxListenersExceededWarning: Possible EventEmitter memory leak detected.
// 11 month listeners added to[Ticker].Use emitter.setMaxListeners() to increase limit
// (Use `node --trace-warnings ...` to show where the warning was created)

// Попробовала изменить время и столкнулась с ошибкой, и теперь интересно, стоит ли применять setMaxListeners в данном случае?

