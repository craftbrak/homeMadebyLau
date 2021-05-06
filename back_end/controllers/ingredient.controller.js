const db = require("../models");
const Ingredient = db.Ingredient;
const Op = db.Sequelize.Op;
const mv = require("mv")
const formidable = require('formidable');
// Create and Save a new Ingredient
exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files)=>{
        Ingredient.create({
            name: fields.ingre_name ,
            description:fields.ingre_description,
            image_path: './none',
            LanguageId: fields.ingre_lang,
            SeasonId: fields.ingre_season,
            IngredientOriginId: fields.ingre_origin
        })
            .then((ingre) => {
                let newpath = `./static/images/ingredient_images/${ingre.id}/${files['ingre_image'].name}`
                mv(files['ingre_image'].path,newpath, {mkdirp: true},err=>{
                    if (err) throw err;
                    res.status(201).json(ingre)
                    ingre.image_path = newpath
                    ingre.save()
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
    Ingredient.findAll({include :[
            {
                model: db.Ingredient_Origin
            }
        ]

    })
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Recipies."
            });
        });

};

// Find a single Ingredient with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Ingredient.findByPk(id,{include :[
            {
                model: db.Ingredient_Origin
            }
        ]

    })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Ingredient with id=" + id
            });
        });
};

// Update a Ingredient by the id in the request
exports.update = (req, res) => {

};

// Delete a Ingredient with the specified id in the request
exports.delete = (req, res) => {
    Ingredient.destroy({
        where: {
            id: req.params.id
        }
    }).then(resp=>{
        res.sendStatus(200)
    }).catch((err)=>{
        console.log(err)
        res.status(500).send({
            message:
                err.message || "Some error occurred while destoying the ingredient."
        });
    })
};


