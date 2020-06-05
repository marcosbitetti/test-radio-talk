const service = require('./../services/game');

async function list(request, response, next) {
    const data = await service.list();
    response.send(data).end();
}

async function find(request, response, next) {
    const {id} = request.params;
    const game = await service.find(id);
    if (game && game.length) {
        return response.json(game[0]).end();
    }
    response.status(400).json({status:'error', message: 'Game not found'}).end();
}


exports.route = (app) => {
    app.get('/', list);
    app.get('/:id', find);
};