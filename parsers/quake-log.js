const fs = require('fs');
const readline = require('readline');

// tokens
const INITGAME = 'InitGame';
const ENDGAME = 'ShutdownGame';
const KILL = 'Kill';

const eventParser = /^([ \d:]+)(\w+)/;
const killParser = /^([ \d:]+)(\w+)(:[ \d]+: *)([ \w<>]+)( killed )([ \w]+)( by .+)$/;

function emptyGame() {
    return {
        total_kills: 0,
        players: [],
        kills: {},
    }
}

function parseKill(line, game) {
    const res = killParser.exec(line);
    const player = res[4];
    const killed = res[6];

    game.total_kills ++;
    if (player !== '<world>' && game.players.indexOf(player)<0) {
        game.players.push(player);
        game.kills[player] = 0;
    }
    if (game.players.indexOf(killed)<0) {
        game.players.push(killed);
        game.kills[killed] = 0;
    }

    if (player === '<world>') {
        game.kills[killed] -= 1;
    } else {
        game.kills[player] += 1;
    }
}

function parseLine(line, log) {
    const res = eventParser.exec(line);
    const game = log.length ? log[log.length-1] : null;
    
    if (res.length === 3) {
        const event = res[2];
        switch (event) {
            case INITGAME:
                log.push( emptyGame() );
                break;
            case ENDGAME:
                break;
            case KILL:
                parseKill(line, game);
                break;
        }
    }
}

exports.read = path => {
    return new Promise((resolve, reject) => {
        const read = readline.createInterface({
            input: fs.createReadStream(path),
            //output: process.stdout,
            crlfDelay: Infinity,
            //console: false,
        });
    
        const log = [];
    
        console.log('start readin log');
    
        read.on('line', data => {
            //console.log(data);
            parseLine(data, log)
        });
    
        read.on('close', () => {
            console.log('end log');
            read.close();
            resolve(log);
        });
    });
};