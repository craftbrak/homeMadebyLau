const db = require("../models");
const jwt = require("jsonwebtoken");
const User = db.User;
const {authSecret, RefreshSecret, VerifySecret} = require('../config/auth.config')
const {transporter} = require('../config/mail.config')
exports.ObjectExistNoNullField = obje =>{
    result = true
    nonTrueKeys = []
    if (Object.keys(obje).length <=0){
        result = false
    }
    for (key in obje) {
        if (!obje[key] || obje[key] ===null){
            result=false
            nonTrueKeys.push(key)
        }
    }
    return result
}
exports.verifyAuth = (req, res, next) =>{
    authenticateJWT(req,res,next)
}

exports.verifyAdmin = (req, res, next) => {
    if (req.user.right === 10){
        next()
    }
    else{
            res.sendStatus(403)
    }

}
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, authSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

