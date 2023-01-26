
const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    followerId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'follower'
    },
    followingId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'following'
    },
    totalTweet: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'tweet'
    }
})

module.exports = mongoose.model('user', User);