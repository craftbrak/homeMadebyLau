const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const jwtoken = require('jsonwebtoken');
const {authSecret, RefreshSecret} = require('../config/auth.config')
// connecting a user.
exports.login = async (req, res) => {
    if (!req.user){
        User.findOne({
            where:{
                email : req.body.email
            }
        }).then(async (user)=>{
            if (user && await bcrypt.compare(req.body.password,user.password)){
                const accessToken = this.generateAccessToken(user);
                const refreshToken = this.generateRefreshToken(user);
                res.status(201).json({accessToken: accessToken, refreshToken: refreshToken})
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
                 "User aleready connected "
        })
    }
};

// disconnecting a user
exports.logout = (req, res) => {
    if (req.user && req.body.token ) {
        db.RefreshToken.destroy({
            where:{
                token: req.body.token
            }
        })
        res.status(204).send()
    }
    else {
        res.status(400).send({
            message:
                "User aleready disconnected"
        })
    }
};

exports.refreshAccessToken = (req, res) => {
    const refreshToken = req.body.refresh
    if (refreshToken === null) return res.sendStatus(401)
    db.RefreshToken.findOne({
        where : {
            token: refreshToken
        }
    })
        .then(token =>{
            if (!token) return res.sendStatus(403)
            jwtoken.verify(refreshToken, RefreshSecret, (err, user)=>{
                if (err && err.name === "TokenExpiredError"){
                    token.destroy()
                    res.sendStatus(401)
                    return
                }
                const accessToken = this.generateAccessToken(user)
                res.status(201).json({accessToken: accessToken})
            })
        })
        .catch(err =>{
            throw err
            res.status(500).send(err)
        })
}

exports.generateAccessToken = (user) => {
    const userData ={
        id: user.id,
        email: user.email,
        right: user.right,
        user_name: user.user_name
    }
    return jwtoken.sign(userData ,authSecret,{expiresIn: '5m'})
}
exports.generateRefreshToken = (user) => {
    const userData ={
        id: user.id,
        email: user.email,
        right: user.right,
        user_name: user.user_name
    }
    const refreshToken=  jwtoken.sign(userData ,RefreshSecret,{expiresIn: '1h'})
    db.RefreshToken.create({token: refreshToken})
        .catch(err=>{
            console.log(err)
        })
    return refreshToken
}