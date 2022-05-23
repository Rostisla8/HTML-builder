
const fs = require('fs');
const path = require('path');
const pathF = path.join(__dirname, 'files');
const pathFCopy = path.join(__dirname, 'files-copy');

const copyDirPath = (pathFolder, pathFCopy) => {
  fs.mkdir(pathFCopy, { recursive: true }, (error) => {
    if (error) console.log(error);
  });

  fs.readdir(pathFCopy, (error, data) => {
    if (error) console.log(error);
    data.forEach((item) => {
      fs.access(path.join(pathFolder, item), (error) => {
        if (error) {
          fs.rm(path.join(pathFCopy, item), { recursive: true, force: true}, (error)   => {
            if (error) console.log(error);
          });
        }
      });
    });
  });

  fs.readdir(pathFolder, {withFileTypes: true}, (error, data,) => {
    if (error) console.log(error);
    data.forEach(file => {
      if(file.isFile()) {
        fs.copyFile(path.join(pathFolder, file.name), path.join(pathFCopy, file.name),   (error) =>{
          if (error) console.log(error);
        });
      }
      if(file.isDirectory()) {
        copyDirPath(path.join(pathFolder, file.name), path.join(pathFCopy, file.name));
      }
    });
    console.log('Folder is created!');
  });
};

copyDirPath(pathF, pathFCopy);
