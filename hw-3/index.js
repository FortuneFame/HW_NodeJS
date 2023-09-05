require('./ticker');

const Social = require('./social');

const social = new Social();
social.on('social net post', (post) => { // Подписка на "social net post" и с шансом 50% ставит посту лайк
    for (const member of social.members) { 
        const chance = Math.random();
        if (chance > 0.5) {
            member.emit('like', post);
        };
    };
});