const readline = require('readline');
const { compress } = require('./compress');
const { uncompress } = require('./uncompress');
const { help } = require('./help');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let cherryMode = false;

const output = (message) => {
    console.log(cherryMode ? `🍒 ${message}` : message);
};

const mainMenu = () => {
  rl.question('\nВыберите команду (compress, uncompress, help, end): ', (command) => {
    switch (command.trim()) {
      case 'compress':
        compress(output, rl, mainMenu);
        break;
      case 'uncompress':
        uncompress(output, rl, mainMenu);
        break;
      case 'help':
        help(output);
        mainMenu();
        break;
      case 'cherry':
        cherryMode = !cherryMode;
        output('Режим cherry ' + (cherryMode ? 'включен' : 'выключен'));
        mainMenu();
        break;
      case 'end':
        rl.close();
        break;
      default:
        output('Неизвестная команда. Попробуйте еще раз.');
        mainMenu();
        break;
    }
  });
};

mainMenu();
