
const mongoose = require('mongoose');

const Tweets = new mongoose.Schema({
    tweet:{
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = mongoose.model('tweet', Tweets);