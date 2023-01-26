if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

module.exports = {
    port: process.env.port,
    db: process.env.db,
    secret: process.env.secret
};
