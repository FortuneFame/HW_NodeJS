const { MessengerMediator, User } = require('./mediator');

class MessengerFacade {
    constructor() {
        // Инициализация медиатора
        this.mediator = new MessengerMediator();
    }

    // Регистрация нового пользователя и добавление его в медиатор
    registerUser(name) {
        const user = new User(name);
        this.mediator.addUser(user);
        return user;
    }

    // Отправка прямого сообщения от одного пользователя другому
    directMessage(sender, receiverName, message) {
        this.mediator.sendMessage(sender, receiverName, message);
    }

    // Отправка объявления от одного пользователя всем остальным
    sendAnnouncement(sender, message) {
        this.mediator.users.forEach(user => {
            if (user !== sender) {
                user.receiveMessage(sender, message);
            }
        });
    }
}

module.exports = MessengerFacade;
