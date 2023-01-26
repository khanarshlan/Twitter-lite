const User = require('../model/user.model');
const Twitter = require('../model/tweets.models');

exports.create = async (req, res) => {
    const obj = {
        tweet: req.body.tweet,
        userId: req._id
    }
    try{
        const tweet = await Twitter.create(obj);
        const user = await User.findOne({_id: req._id});
        if(!user.totalTweet.includes(tweet._id) || user.totalTweet.length == 0) {
            user.totalTweet.push(tweet._id);
        }
        await user.save();
        res.status(201).send({
            name: user.name,
            tweet: tweet.tweet
        })
    }catch(err) {
        res.status(500).send({message: `Error occur at ${err}`});
    }
}

exports.getAll = async(req, res) => {
    try{
        let user = await User.findOne({_id: req._id});
        let result = [];
        for(let x of user.totalTweet) {
            let obj = await Twitter.findOne({_id: x});
            result.push({
                name: user.name,
                tweet: obj.tweet,
            })
        }
        res.status(200).send(result);
    }catch (err) {
        res.status(500).send({message: `Error occur at ${err}`});
    }
}

exports.delete = async (req, res) => {
    let _id = req.params.id;
    try{
        await User.updateOne({_id: req._id}, {$pull: {totalTweet: {$in: [_id]}}})
        await Twitter.deleteOne({_id});
        res.status(200).send({message: `Tweet deleted successfully`});
    } catch(err) {
        res.status(500).send({message: `Error occur at ${err}`});
    }
}