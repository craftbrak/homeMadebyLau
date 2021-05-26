const db = require("../models");
const Ingredient_Origin = db.Ingredient_Origin;
const Op = db.Sequelize.Op;
const mv = require("mv")
const formidable = require('formidable');
const validation = require("../utils/homemade_library");
const fs = require("fs");
exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files)=>{
        if (validation.ObjectExistNoNullField(fields)){
            Ingredient_Origin.create({
                name: fields.origin_name ,
                description:fields.origin_description,
                image_path: './none',
                address:fields.origin_address,
                website: fields.origin_website,
                phone_number: fields.origin_phone_number,
                email: fields.origin_email
            })
                .then((orign) => {
                    let newpath = `./static/images/origin_images/${orign.id}/${files['origin_image'].name}`
                    mv(files['origin_image'].path,newpath, {mkdirp: true},err=>{
                        if (err) throw err;
                        res.status(201).json(orign)
                        orign.image_path = newpath
                        orign.save()
                    })
                }).catch((err)=>{
                console.log(err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving Recipies."
                });
            });
        }else {
            res.status(400).send({
                message:
                    "Some value was not correct"})
        }

    })

};

// Retrieve all Recipes from the database.
exports.findAll = (req, res) => {
    let limit = req.query.limit;
    let offset = req.query.offset;
    if(!limit) limit = 20
    if (limit > 20) limit = 20
    if (limit <= 0 ) limit = 1
    if (!offset) offset = 0
    Ingredient_Origin.findAll({
        limit: limit,
        offset:offset
    })
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Origins."
            });
        });

};

// Find a single Ingredient_Origin with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Ingredient_Origin.findByPk(id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Ingredient_Origin with id=" + id
            });
        });
};

// Update a Ingredient_Origin by the id in the request
exports.update = (req, res) => {
    if (validation.ObjectExistNoNullField(req.body)){
        Ingredient_Origin.findByPk(req.params.id,{
            attributes:['id','code','full_name']
        })
            .then(origin =>{
                origin.name = req.body.name
                origin.description = req.body.description
                origin.address = req.body.address
                origin.website = req.body.website
                origin.phone_number = req.body.phone_number
                origin.email = req.body.email
                origin.LanguageId = req.body.LanguageId
                origin.save()
                res.status(200).json(origin)
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || `Some error occurred while updating the origin with the id :${req.params.id}.`
                });
            });
    }
    else {
        res.status(400).send({
            message:
                "Some value was not correct"})
    }
};

// Delete a Ingredient_Origin with the specified id in the request
exports.delete = (req, res) => {
    Ingredient_Origin.destroy({
        where: {
            id: req.params.id
        }
    }).then(resp=>{
        console.log(resp)
        res.sendStatus(200)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || `Some error occurred while deleting the Recipie with the id :${req.params.id}.`
        });
    });
};
exports.changeImage = (req, res) => {
    Ingredient_Origin.findByPk(req.params.id).then(ori => {
        fs.unlink(ori.image_path, (err) => {
            if (err) {
                console.error(err)
                return
            }
            let form = new formidable.IncomingForm();
            form.parse(req,(err,fields,files)=>{
                let newpath = `./static/images/origin_images/${ori.id}/${files['origin_image'].name}`
                mv(files['origin_image'].path,newpath, {mkdirp: true},err=>{
                    if (err) throw err;
                    ori.image_path = newpath
                    ori.save()
                    res.status(201).json(ori)
                })
            })

        })
    })

}
