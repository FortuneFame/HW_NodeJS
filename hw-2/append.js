const fs = require('fs').promises;

const appendRandom = async () => {
  const files = await fs.readdir('./fs_test_directory');

  const txtFiles = files.filter(file => file.includes('.txt'));

  const promises = txtFiles.map(async (file) => {
    const randomDigit = `\n` + Math.floor(Math.random() * 10);
    await fs.appendFile(`./fs_test_directory/${file}`, randomDigit.toString());
  });

  await Promise.all(promises);
  console.log('Append done');
}

appendRandom().catch(console.error);

  // node append.js