const log = require('./parsers/quake-log');

async function dt() {
    let logData = await log.read('./data/games.log');
    console.log(logData)
}

dt()
