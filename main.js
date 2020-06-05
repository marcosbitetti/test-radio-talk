const express = require("express");

require('dotenv').config();
const app = express();

// route
require('./resources/games').route(app);

app.listen( process.env.PORT || 5000, () => {
    console.log('Server running on port ' + (process.env.PORT || 5000));
});

// nodemon scripts/report.js report.txt

/*async function dt() {
    let logData = await log.read(process.env.DATA_FILE);
    console.log(logData)
}

dt()

console.log(process.env.DATA_FILE)*/


