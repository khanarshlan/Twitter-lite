
const controller = require('../controller/follower.controller');
const {verifyJwt} = require('../middleware');

module.exports = (app) => {

    app.get('/api/v1/follow_following/:id', [verifyJwt.jwtToken] ,controller.follow_and_following);

    app.get('/api/v1/unfollow/:id', [verifyJwt.jwtToken], controller.unfollow);
}