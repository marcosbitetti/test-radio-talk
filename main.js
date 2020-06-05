const log = require('./parsers/quake-log');

require('dotenv').config();

async function dt() {
    let logData = await log.read(process.env.DATA_FILE);
    console.log(logData)
}

dt()

console.log(process.env.DATA_FILE)


