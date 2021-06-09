const db = require("../models");
const Workshop = db.Workshop
const Recipe_Workshop = db.sequelize.models.Recipe_Workshop
const { ObjectExistNoNullField }= require("../utils/homemade_library");
const {SubscriptionSecret} = require('../config/auth.config');
const {transporter} = require('../config/mail.config');
const jwt = require("jsonwebtoken");
exports.create = (req ,res )=>{
    if (!ObjectExistNoNullField(req.body)) return res.sendStatus(400)
    if (new Date(req.body.date).getTime() < new Date(req.body.subscribeBefore).getTime()) return res.sendStatus(400)
    Workshop.create({
        title: req.body.title,
        date:req.body.date,
        address: req.body.address,
        link: req.body.link,
        description: req.body.description,
        subscribeBefore: req.body.subscribeBefore,
        available: req.body.available,
        maxSubscription: req.body.maxSubscription
    })
        .then(workshop => {
        res.status(201).json(workshop)
    })
        .catch(err => {
            throw err
            res.sendStatus(500)
        })

}
exports.update = (req ,res )=>{
    if (!ObjectExistNoNullField(req.body)) return res.sendStatus(400)
    if (new Date(req.body.date).getTime() < new Date(req.body.subscribeBefore).getTime()) return res.sendStatus(400)
    Workshop.findByPk(req.params.id)
        .then(workshop => {
            workshop.title = req.body.title
            workshop.date= req.body.date
            workshop.address= req.body.address
            workshop.link= req.body.link
            workshop.description= req.body.description
            workshop.subscribeBefore= req.body.subscribeBefore
            workshop.available= req.body.available
            workshop.maxSubscription= req.body.maxSubscription
        workshop.save().then(res.status(201).json(workshop))
    })
        .catch(err => {
            throw err
            res.sendStatus(500)
        })
}
exports.getAll = (req ,res )=>{
    let limit = req.query.limit;
    let offset = req.query.offset;
    if(!limit) limit = 20
    if (limit > 20) limit = 20
    if (limit <= 0 ) limit = 1
    if (!offset) offset = 0
    let include = [{
        association: "Recipe",
        attributes:['id'],
        through:{
            attributes:[]
        }
    }]
    if (req.user.right === 10) include.push( {
        association: "subscribed",
        attributes: ['id'],
        through: {
            attributes: []
        }
    })
    Workshop.findAll({
        include: include,
        limit: limit,
        offset: offset
    })
        .then(workshops => res.status(200).json(workshops))
        .catch(err => {
            throw err
            res.sendStatus(500)
        })
}
exports.getOne = (req ,res )=>{
    let include = [{
        association: "Recipe",
        attributes:['id'],
        through:{
            attributes:[]
        }
    }]

    if (!req.params.id) return res.sendStatus(400)
    Workshop.findByPk(req.params.id,{
        include: include
    })
        .then(workshop => res.status(200).json(workshop))
        .catch(err => {
            throw err
            res.sendStatus(500)
        })
}
exports.delete = (req ,res )=>{
    if (!req.params.id) return res.sendStatus(400)
    Workshop.findByPk(req.params.id)
        .then(workshop =>{
            workshop.destroy()
            res.status(204).json(workshop)
        })
        .catch(err => {
            throw err
            res.sendStatus(500)
        })
}

exports.addRecipe = (req ,res )=>{
    Workshop.findByPk(req.params.id ,{
        include: [{
            association: "Recipe",
            attributes:['id'],
            through:{
                attributes:[]
            }
        }]
    })
        .then(workshop =>{
            db.Recipe.findByPk(req.body.RecipeId)
                .then(async recipe =>{
                    if (!recipe) return res.sendStatus(400)
                    await workshop.addRecipe(recipe)
                    res.status(202).send(workshop)
                })
        })
        .catch(err=>{
            throw err
            res.sendStatus(500)
        })
}

exports.deleteRecipe = (req ,res )=>{
    Recipe_Workshop.findOne({
        where:{
            RecipeId: req.params.idR,
            Workshop: req.params.id
        }
    }).then(async rw=>{
        await rw.destroy()
        res.sendStatus(204)
    })
}

exports.subscribeUser = (req ,res )=>{
    Workshop.findByPk(req.params.id)
        .then(workshop => {
            if (!workshop) return res.sendStatus(400)
            db.User.findByPk(req.body.UserId)
                .then(async user =>{
                    workshop.addSubscribed(user,{through: {validated: false}})
                    await this.sendVerifyWorkshopSubscription(req)
                    res.status(202).send(workshop)
                })
        })
        .catch(err=>{
            throw err
            res.sendStatus(500)
        })
}
exports.unSubscribeUser = (req ,res )=>{
    db.User_Workshop.findOne({
        where:{
            WorkshopId: req.params.id,
            UserId: req.params.idUser
        }
    })
        .then(async uw =>{
            await uw.destroy()
            res.sendStatus(204)
        })
        .catch(err => {
            throw err
            res.sendStatus(500)
        })
}
exports.getTotalSubs = (req ,res )=>{
    db.User_Workshop.count({
        where:{
            WorkshopId : req.params.id
        }
    })
        .then(userNumber => res.status(200).json(userNumber))
        .catch(err => {
            throw err
            res.sendStatus(500)
        })
}
exports.sendVerifyWorkshopSubscription = async (req , res) =>{
    if(!req.params.id) return res.sendStatus(400)
    const workshop = await Workshop.findByPk(req.params.id)
    if(!workshop) return res.sendStatus(400)
    if (!req.user.right >0) return res.status(401).send('Valided your account first')
    const user = {
        id : req.user.id,
        email: req.user.email,
        right: req.user.right,
        user_name: req.user.user_name
    }
    const veriftoken =  await jwt.sign(user, SubscriptionSecret, {expiresIn: '1h'})
    let info = await transporter.sendMail({
        from: "noReply@homemadeByLau.be",
        to: req.user.email, // list of receivers
        subject: "Workshop validation", // Subject line
        html:`
            <body>
                <h1>Valider votre inscription a l'atelier homeMade by lau </h1>
                <h2>Bonjour ${req.user.user_name}</h2>
                <p>Afin de completer le processus d'inscription a l'atier merci de valider que les heures vous conviennent bien</p>
                <h2>L'aterlier aura lieux le ${workshop.date}</h2>
                <h3>Pour verifier votre inscription veiller cliker sur le lien si desous</h3>
                <a href="http://localhost:8080/api/workshop/${req.params.id}/verify/${veriftoken}">ici</a>
                <p>ce lien n'est valide que 20 minutes</p>
            </body>`,
    })
    if (res) res.status(202).send(info)
}
exports.validateSubscription = (req, res) =>{
    if (!req.params.tokken) return res.sendStatus(400)
    jwt.verify(req.params.tokken, SubscriptionSecret, (err, user) => {
        if (err) {
            return res.status(403).send('link expired');
        }
        db.User_Workshop.findOne({
            where:{
                UserId:user.id,
                WorkshopId:req.params.id
                }
        })
            .then(userW =>{
                userW.validated = true
                userW.save()
                res.status(200).redirect('http://localhost:8081/')
            })

    })
}