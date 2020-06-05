const fs = require('fs');
require('dotenv').config();

const {pad, fit, center} = require('./../utils');
const log = require('../parsers/quake-log');

async function out(data) {
    console.log(data);
    if (stream) {
        stream.write(data);
        stream.write("\r\n");
    }
}

const LINE_SIZE = 80;
const HR = [].constructor(LINE_SIZE).join('-');

let stream = null;

/**
 * Generate a report to file/console
 */
async function generate() {
    const logData = await log.read(process.env.DATA_FILE);
    out('Relatório de partidas');
    
    for(let game of logData) {
        out( HR )
        out( 'Game #' + pad(game.id,2) )
        out('Total Kills: ' + game.total_kills);
        out(center('Mortes por player', LINE_SIZE, '-'));
        const col = Math.floor(LINE_SIZE / game.players.length) - 1;
        let lin = [];
        for(let p of game.players) lin.push(fit(p,col));
        out(lin.join('|'));
        lin = [];
        for(let p of game.players) lin.push(fit(game.kills[p],col));
        out(lin.join('|'));
        out( HR )
        out("\n");
    }
}

function run() {
    if (process.argv.length<3) {
        console.log('USAGE: \nnode scripts/report.js outputfile.txt');
        process.exit();
    }
    const file = process.argv[2];
    console.log(file);
    stream = fs.createWriteStream(file);
    generate();
}

run()