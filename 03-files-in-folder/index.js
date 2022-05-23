const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');
const { stdout, stderr } = require('process');

const getFileInfo = (file) => {
  const fullName = path.join(__dirname, 'secret-folder', file.name);
  fs.stat(fullName, (err, stats) => {
    if (err) stderr.write(`No bitches? \n ${err}`);
    else if (stats.isFile()) {
      let extension = path.extname(fullName);
      let info = `name: ${path.basename(fullName, `${extension}`)}; extension: ${extension.slice(1)}; size: ${stats.size / 1024}kb;`;
      stdout.write(info + '\n');
    }
  });
};

async function getDir() {
  try {
    const files = await fsPromises.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true });
    for (const file of files) getFileInfo(file);
  } catch (err) {
    stderr.write(`Error: ${err}`);
  }
}

getDir();
