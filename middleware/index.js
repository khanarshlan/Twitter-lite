const authVerify = require('./authVerify.middleware');
const verifyJwt = require('./jwtverify.middleware');

module.exports = {authVerify, verifyJwt}