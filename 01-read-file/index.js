const path = require('path');
const fs = require('fs');

let file = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf8');
file.on('data', (e) => console.log(e));
