const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
const formidable = require('formidable');
const jwtoken = require('jsonwebtoken');
const {authSecret, RefreshSecret, VerifySecret} = require('../config/auth.config')
const {generateAccessToken,generateRefreshToken} = require('./session.controller')
const {transporter} = require('../config/mail.config')
const jwt = require("jsonwebtoken");
//verify if user aleready exsits
exports.verifyEmail = (req ,res ) =>{
    User.findOne({
        where: {
            email: req.params.email
        }
    }).then(user=> {
        if (user){
            res.status(200).send({
                message:
                    "User aleready registered with this email"
            })
        }
        else {
            res.status(200).send()
        }
    })
}

//retreive User
exports.getUser = (req, res) =>{
    if (req.user.id){
        User.findOne({
            where:{
                email :req.user.email
            },
            attributes:["user_name","first_name","email","last_name"]
        }).then(user=>{
            res.status(200).json(user)
        }).catch((err)=>{
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving the user."
            })
        })
    }
    else {
        res.status(401).send({
            message:
                "you need to connect to access your user page"
        })
    }

}
// Retrieve all Recipes from the database.
exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files)=>{
        User.findOne({
            where: {
                email: fields.email
            }
        }).then((use)=>{
            if (use) {
                res.status(200).send({
                    message:
                       "User aleready registered with this email"
                })
            }
            else {
                User.create({
                    user_name: fields.user_name ,
                    last_name:fields.last_name,
                    first_name: fields.first_name,
                    email: fields.email,
                    password: fields.password
                })
                    .then(async (user) => {
                        const userData ={
                            id: user.id,
                            email: user.email,
                            right: user.right,
                            user_name: user.user_name
                        }
                        req.user = userData
                        await this.sendVerifyAuthEmail(req)
                        const accessToken = generateAccessToken(user);
                        const refreshToken = generateRefreshToken(user);

                        res.status(201).json({accessToken: accessToken, refreshToken: refreshToken})
                    })
                    .catch((err)=>{
                        console.log(err)
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while retrieving Recipies."
                        })
                    })
            }
        })

        })
};

// Find a single User with an id
exports.update = (req, res) => {
    if (req.user.id == req.params.id){
        User.findByPk(req.params.id).then(user=>{
            user.user_name = req.body.user_name
            user.last_name = req.body.last_name
            user.first_name = req.body.first_name
            user.password = req.body.password
            user.save()
            const data = {
                id : user.id,
                user_name : user.user_name,
                last_name : user.last_name,
                first_name: user.first_name,
                email : user.email
            }
            res.status(201).json(data)
        }).catch(err=>{
            res.status(500).send(err)
        })
    }
};

// Find a single User with an id
exports.delete = (req, res) => {
    if (req.user.id == req.params.id){
        User.destroy({
            where: {
                id : req.params.id
            }
        })
            .then(resp=>{
                res.status(200).send({message : "deleted"})
            })
            .catch(err=>{
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while deliting the User."
                });
            })
    }
};

exports.subscribedWorkshop  = (req ,res )=>{
    db.User_Workshop.findAll({
        where: {
            UserId: req.user.id
        },
        attributes: ["WorkshopId"]
    })
        .then(workshop => {
            console.log(workshop)
            res.status(200).json(workshop)
        })
}
exports.sendVerifyAuthEmail = async (req, res) =>{
    if (req.user.right >0) return res.sendStatus(403)
    const user = {
        id : req.user.id,
        email: req.user.email,
        right: req.user.right,
        user_name: req.user.user_name

    }
    const veriftoken =  await jwt.sign(user,VerifySecret, {expiresIn: '1h'})
    let info = await transporter.sendMail({
        from: "noReply@homemadeByLau.be",
        to: req.user.email, // list of receivers
        subject: "HomemadeByLau validation", // Subject line
        html:`
            <body>
                <h1>Verifier votre comte homeMade by lau </h1>
                <h2>Bonjour ${req.user.user_name}</h2>
                <p>Pour avoir access auw differentes fonctionalitée du site il faut verifier votre email </p>
                <h2>Pour verifier votre inscription veiller cliker sur le lein si desous</h2>
                <a href="http://localhost:8080/api/user/${req.user.id}/verify/${veriftoken}">ici</a>
                <p>ce lien n'est valide que 20 minutes</p> 
            </body>`,
    })
    if (res) res.status(202).send(info)
}
exports.verifyUser = async (req, res) => {
    if (!req.params.tokken) return res.sendStatus(400)
    jwt.verify(req.params.tokken, VerifySecret, (err, user) => {
        if (err) {
            return res.status(403).send('link expired');
        }
        User.findByPk(user.id)
            .then(user =>{
                user.right = 1
                user.save()
                res.status(200).redirect('http://localhost:8081/')
            })

    })
}