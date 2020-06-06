const assert = require('assert');
const fs = require('fs');
const execSync = require('child_process').execSync
const chai = require('chai');
const chaiHttp = require('chai-http');

const {app} = require('./../server');

// initialization

describe('Verify environment', () => {
    it('.env exists?', () => {
        assert.equal( fs.existsSync('./.env'), true );
    });
});

describe('Getting data', () => {
    it('data lenght > 0', async () => {
        require('dotenv').config();
        const data = await require('./../parsers/quake-log').read(process.env.DATA_FILE);
        assert.equal( data && data.length>0 , true);
    });
});

// console script

describe('Testing script report', () => {
    it('report file exists?', async () => {
        require('dotenv').config();
        // cross-platform using DOS command
        execSync('del report.txt; rm report.txt; node scripts/report.js report.txt');
        it('report created?', () => {
            assert.equal( fs.existsSync('./report.txt'), true );
        });
    });
});


// web server
chai.use(chaiHttp);
chai.should();

describe('WEB SERVER ENDPOINTS', () => {
    describe('GET /', () => {
        it('retrieve a list of games', done => {
            chai.request(app)
                .get('/')
                .end( (err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('check if list is full filled', done => {
            chai.request(app)
                .get('/')
                .end( (err, res) => {
                    res.should.have.status(200);
                    chai.expect(res.body.list && res.body.list.length>0).to.be.true;
                    done();
                });
        });
    });
    
    describe('GET /{game}', () => {
        it('whait for a game [2º id are filled in log]', done => {
            chai.request(app)
                .get('/')
                .end((err,res) => {
                    const id = res.body.list[2];
                    chai.request(app)
                    .get(`/${id}`)
                    .end( (err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
                });
        });
    });
});
