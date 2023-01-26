const User = require('../model/user.model');

const verifyauth = async (req, res, next) => {

    if(!req.body.name) return res.status(400).send({messsage: `No name field is provided`});

    if(!req.body.email) return res.status(400).send({message: `No email field is provided`});
    else {
        const email = await User.findOne({email: req.body.email});
        if(email) return res.status(403).send({message: `Email is already register`});
        let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  //this will check all kind of valid email,Gmail
        let testMail = req.body.email;
        if(!regex.test(testMail)) {
            return res.status(401).send({message: `Enate a valid mail`});
        }
    }

    if(!req.body.password) return res.status(400).send({message: `No password filed is provided`});

    if(!req.body.phone) return res.status(400).send({message: `No phone number field is provided`});
    next();
}

module.exports = {verifyauth}
