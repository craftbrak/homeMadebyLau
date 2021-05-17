const db = require("../models");
const User = db.User;
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
    if (req.session.email){
        User.findOne({
            where: {
                email: req.session.email
            }
        }).then(user=>{
            if(user){
                next()
            }
            else{
                res.sendStatus(401)
            }
        })
    }
    else{
        res.sendStatus(401)
    }
}

exports.verifyAdmin = (req, res, next) => {
    User.findOne({
        where: {
            email: req.session.email
        }
    }).then(user=>{
        if(req.session.right === user.right && req.session.right === 10){
            next()
        }
        else{
            res.sendStatus(403)
        }
    })
}