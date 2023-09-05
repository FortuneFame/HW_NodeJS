// Добавила комментарии, чтобы разобрать пошагово (решила не удалять)

const EventEmitter = require('events');
const Member = require('./member');

class Social extends EventEmitter {
    constructor() {
        super();
        // Участники и публикация 
        this.members = [];
        this.posts = [];
        // Подписка на глоб. события
        global.ticker.on('week', this.addMember.bind(this));
        global.ticker.on('year', this.report.bind(this))
    };

    addMember() {
        const randomMembersCount = Math.floor(Math.random() * 4); // Добавляем рандомное кол-во участников (0-3)

        for (let i = 0; i < randomMembersCount; i++) {
            const member = new Member(); // Создаем участника
            this.members.push(member); // Добавляем участника в коллекцию

            // Подписка на "post" и "like" 
            member.on('post', (post) => {
                this.posts.push(post);  // Добавляем публикацию в список
                this.emit('social net post', post) // Генерируем событие новой публикации 
            });
            member.on('like', (post) => {
                post.likes++; // Увеличиваем число лайков у публикации
            });
        };
    };

    report() {
        const topPosts = this.posts.sort((a, b) => b.likes - a.likes).slice(0, 3); // Сортируем по кол-ву лайков

        console.log(' ________________________________');
        console.log('|------------| Отчет |-----------|');
        console.log(`\n  Количество участников: 😎 ${this.members.length}`);
        console.log(`\n  Количество публикаций: 👀 ${this.posts.length}`);
        console.log('\n |---|💥 TOP 3 публикаций 💥|---|');
        topPosts.forEach((post, index) => {
            console.log(`\n  №${index + 1} ✍️  Post: "${post.text}" \n  Оценили: 👍 ${post.likes}`);
        });
        console.log('|________________________________|\n');
    };
};

module.exports = Social;

