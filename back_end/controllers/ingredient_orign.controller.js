const db = require("../models");
const Ingredient_Origin = db.Ingredient_Origin;
const Op = db.Sequelize.Op;
const mv = require("mv")
const formidable = require('formidable');
exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files)=>{
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
    })

};

// Retrieve all Recipes from the database.
exports.findAll = (req, res) => {
    Ingredient_Origin.findAll()
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
    res.status(666).send({
        message: "Error retrieving Ingredient_Origin with id=" + id
    });
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