const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
const formidable = require('formidable');
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
    if (req.session.email){
        User.findOne({
            where:{
                email :req.session.email
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
        req.status(401).send({
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
                    .then((user) => {
                        req.session.username = user.user_name
                        req.session.right = user.right
                        req.session.email = user.email
                        const data ={
                            user_name : user.user_name,
                            right: user.right,
                            email: user.email
                        }
                        res.status(201).send(data)
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
    })
};

// Find a single User with an id
exports.delete = (req, res) => {
    User.destroy({
        where: {
            id : req.params.id
        }
    })
        .then(res=>{
            res.sendStatus(200)
        })
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deliting the User."
            });
        })
};
