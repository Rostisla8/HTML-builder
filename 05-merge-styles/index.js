const fs = require('fs');
const path = require('path');
const writeB = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), 'utf-8');

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (error, data) => {
  data.forEach(file => {
    if(file.isFile()) {
      if(path.extname(file.name) === '.css') {
        const pathFile = path.join(path.join(__dirname, 'styles'), file.name);
        const readFile = fs.createReadStream(pathFile, 'utf-8');
        readFile.pipe(writeB);
      }
    }
  });
});
