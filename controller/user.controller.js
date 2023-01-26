const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/server.config')
const User = require('../model/user.model');

// Signup Handler
exports.create = async (req, res) => {
    const obj = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,10),
        phone: req.body.phone
    }
    try{
        const user = await User.create(obj);
        res.status(201).send(user);
    } catch(err) {
        res.status(500).send({message: `Error occur at ${err}`});
    }
    
}

// Singin Handler
exports.signin = async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(404).send({message: `User not found`});

        let isValid = bcrypt.compareSync(req.body.password, user.password);
        if(!isValid) return res.status(403).send({message: `Invalid Message`});

        let token = jwt.sign({_id: user._id},config.secret, {expiresIn: 1000});
        res.status(200).send({
            email: user.email,
            token: token
        })
    }catch(err) {
        res.status(500).send({message: `Error occur at ${err}`});
    }
}