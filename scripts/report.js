require('dotenv').config();
const {pad, fit, center} = require('./../utils');
const log = require('../parsers/quake-log');



async function out(data) {
    console.log(data);
}

const LINE_SIZE = 80;
const HR = [].constructor(LINE_SIZE).join('-');


async function run() {
    const logData = await log.read(process.env.DATA_FILE);
    out('Relatório de partidas');
    
    for(let game of logData) {
        out( HR )
        out( 'Game #' + pad(game.id,2) )
        out('Total Kills: ' + game.total_kills);
        out(center('Mortes por player', LINE_SIZE));
        const col = Math.floor(LINE_SIZE / game.players.length);
        let lin = '';
        for(let p of game.players) lin += fit(p,col);
        out(lin);
        lin = '';
        for(let p of game.players) lin += fit(game.kills[p],col);
        out(lin);
        out("\n");
    }
}

run()