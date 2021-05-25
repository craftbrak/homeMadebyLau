const db = require("../models");
const Workshop = db.Workshop
const Recipe_Workshop = db.sequelize.models.Recipe_Workshop
const { ObjectExistNoNullField }= require("../utils/homemade_library");

exports.create = (req ,res )=>{
    if (!ObjectExistNoNullField(req.body)) return res.sendStatus(400)
    if (new Date(req.body.date).getTime() < new Date(req.body.subscribeBefore).getTime()) return res.sendStatus(400)
    Workshop.create({
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
    Workshop.findAll({
        include: [{
            association: "Recipe",
            attributes:['id'],
            through:{
                attributes:[]
            }
        }]
    })
        .then(workshops => res.status(200).json(workshops))
        .catch(err => {
            throw err
            res.sendStatus(500)
        })
}
exports.getOne = (req ,res )=>{
    if (!req.params.id) return res.sendStatus(400)
    Workshop.findByPk(req.params.id)
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
                .then(user =>{
                    workshop.addSubscribed(user,{through: {validated: false}})
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