
const controller = require('../controller/user.controller');
const {authVerify} = require('../middleware')

module.exports =(app) => {
    app.post('/api/v1/signup', [authVerify.verifyauth], controller.create);

    app.post('/api/v1/signin', controller.signin);
}