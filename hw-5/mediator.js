// Определение пользователя с функцией получения сообщений
class User {
    constructor(name) {
        this.name = name;
    }

    receiveMessage(sender, message) {
        console.log(`${sender.name} к Пользователю ${this.name}: \n  - ${message}\n`);
    }
}

class MessengerMediator {
    constructor() {
        // Хранение всех пользователей в системе
        this.users = [];
    }

    // Добавление нового пользователя в систему
    addUser(user) {
        this.users.push(user);
    }

    // Отправка сообщения от одного пользователя другому
    sendMessage(sender, receiverName, message) {
        const receiver = this.users.find(user => user.name === receiverName);
        if (receiver) {
            receiver.receiveMessage(sender, message);
        } else {
            console.log(`\nПользователь ${receiverName} не найден!\n`);
        }
    }
}

module.exports = { MessengerMediator, User };
