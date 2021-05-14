const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');

// connecting a user.
exports.login = (req, res) => {
    if (!req.session.user_name){
        User.findOne({
            where:{
                email : req.body.email
            }
        }).then(async (user)=>{
            if (user && await bcrypt.compare(req.body.password,user.password)){
                req.session.user_name = user.user_name
                req.session.right = user.right
                req.session.email = user.email
                const data ={
                    email: user.email,
                    right: user.right,
                    user_name: user.user_name
                }
                res.status(200).json(data)
            }
            else {
                res.status(401).send({
                    message:
                        "The Email and password combination is not correct "
                })
            }
        })
            .catch((err)=>{
                res.status(500).send({
                    message:
                        err.message || "The Email and password combination is not correct "
                })
            })
    }
    else {
        res.status(400).send({
            message:
               "User aleready connected"
        })
    }
};

// disconnecting a user
exports.loggout = (req, res) => {
    if (req.session.user_name) {
        req.session.user_name = null
        req.session.right=null
        req.session.destroy()
        res.status(200).send()
    }
    else {
        res.status(400).send({
            message:
                "User aleready disconnected"
        })
    }
};


