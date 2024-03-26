const fs = require('fs');
const { join: joinPath } = require('path');

const cacheDir = joinPath(__dirname, '..', 'node_modules', '.cache');
fs.rm(cacheDir, { recursive: true }, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Cache folder ${cacheDir} is deleted!`);
});
