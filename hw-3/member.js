const EventEmitter = require('events');
const Post = require('./post');

const words = "Я вас любил любовь еще быть может в душе моей угасла не совсем но пусть".split(' ');

class Member extends EventEmitter{
    constructor() {
        super();
        global.ticker.on('month', this.createPost.bind(this)); // Подписываем на глобальное событие 'month'
    };

    createPost() {
        const postText = this.generateRandomText();
        const post = new Post(postText);
        this.emit('post', post); // Генерируем событие 'post'
    };


    generateRandomText() {
        const getRandomWord = () => words[Math.floor(Math.random() * words.length)];
        return `${getRandomWord()} ${getRandomWord()} ${getRandomWord()}`; // Можно через "for" но циклы потребляют много времени и памяти 
    };
};

module.exports = Member;