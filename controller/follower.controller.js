
const User = require('../model/user.model');

exports.follow_and_following = async (req, res) => {
    const _id = req.params.id;
    try{

        // User whom logged in user want to follow
        const followUser = await User.findOne({_id});
        followUser.followerId.push(req._id);
        await followUser.save()

        // Update the logged in user following list whom he/she follows
        //if you follow someone they will also follow back to you.
        //here ewe are getting id of user and follow him and also 
     const following_user = await User.findOne({_id: req._id});
        following_user.followingId.push(_id);
        await following_user.save();
        res.status(200).send(following_user);
    } catch(err) {
        res.status(500).send({message: `Error occur at ${err}`});
    }
}

exports.unfollow = async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.updateOne({_id: req._id}, {$pull: {followingId: {$in: [_id] } } } );
        await User.updateOne({_id}, {$pull: {followerId: {$in: [req._id] } } } );
        res.status(200).send({message: `Unfollow successfull`});
    } catch (err) {
        res.status(500).send({message: `Error occur at ${err}`});
    }
}