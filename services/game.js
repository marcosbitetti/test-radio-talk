const log = require('./../parsers/quake-log');
let logData = null;

// Singleton
async function getData() {
    if (!logData) {
        logData = await log.read(process.env.DATA_FILE);
    }
    return logData;
}

exports.list = async () => {
    const data = await getData();
    const ret = [];
    data.map( row => ret.push(row.id));
    return { list: ret };
};

exports.find = async (id) => {
    const data = await getData();
    return data.filter( row => row.id == id);
};