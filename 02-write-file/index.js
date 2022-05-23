const path = require('path');
const fs = require('fs');
const process = require('process');
const { stdin: input, stdout: output } = require('process');
const readline = require('readline');

const writeL = (input) => {
  if (input === 'exit') {
    process.exit();
  } else {
    writeContent.write(input + '\n');
  }
};
const lineE = () => {
  output.write('Written text saved in text.txt');
  interfaceReadline.close();
};
const interfaceReadline = readline.createInterface({ input, output });
const writeContent = fs.createWriteStream(path.join(__dirname, 'text.txt'));

output.write('Enter your text:');
interfaceReadline.on('line', writeL);
process.on('exit', lineE);
