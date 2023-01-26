
const controller = require('../controller/twitter.controller');
const {verifyJwt} = require('../middleware')

module.exports = (app) => {
    app.post('/twitter/api/v1/post', [verifyJwt.jwtToken], controller.create);

    app.get('/twitter/api/v1/post', [verifyJwt.jwtToken], controller.getAll);

    app.delete('/twitter/api/v1/post/:id', [verifyJwt.jwtToken], controller.delete);
}