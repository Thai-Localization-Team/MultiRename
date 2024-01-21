const fs = require('fs');
const path = require('path');
const readline = require('node:readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});


const dir = path.dirname(process.execPath);

let log = ""

const loging = (text) => {
  console.log(text)
  log = log + "\n" + text;
  fs.writeFileSync(path.join(dir,'log.txt'), log);
}

readline.question(`target text:`, target => {
  readline.question(`replace text:`, replace => {
    readline.close();
    let files = fs.readdirSync(dir)
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      try {
        let stats = fs.statSync(filePath)
        if (stats.isFile()) {
          fs.renameSync(filePath,path.join(dir, file.replace(target,replace,1)))
        }
      }catch (err) {
        loging(err)
      }
    })
  })
})