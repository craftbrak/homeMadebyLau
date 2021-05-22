const db = require("../models");
const Ingredient = db.Ingredient;
const Op = db.Sequelize.Op;
const mv = require("mv")
const formidable = require('formidable');
const fs = require("fs");
const del = require('del');
// Create and Save a new Ingredient
exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files)=>{
        Ingredient.create({
            name: fields.ingre_name ,
            description:fields.ingre_description,
            imagePath: './none',
            LanguageId: fields.ingre_lang,
            SeasonId: fields.ingre_season,
            IngredientOriginId: fields.ingre_origin
        })
            .then((ingre) => {
                let newpath = `./static/images/ingredient_images/${ingre.id}/${files['ingre_image'].name}`
                mv(files['ingre_image'].path,newpath, {mkdirp: true},err=>{
                    if (err) throw err;
                    ingre.imagePath = newpath
                    ingre.save()
                    res.status(201).json(ingre)
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
    const seasson = req.query.seasonId;
    const language = req.query.languageId;
    const orderC = req.query.orderColumn;
    const orderS = req.query.orderDirection
    let where = {};
    let order =['id','ASC']
    if(seasson) where.SeasonId = seasson
    if(language) where.LanguageId = language
    if(orderC) {
        order[0] = orderC
        if (orderS) order[1] = orderS
        else order[1] = 'ASC'
    }
    Ingredient.findAll({
        attributes:{
            exclude:["createdAt", "updatedAt"]
        },
        where:where,
        order:[order]
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
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Ingredient with id=" + id
            });
        });
};

// Update a Ingredient by the id in the request
exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files)=>{
        Ingredient.findByPk(req.params.id)
            .then((ingre) => {
                ingre.name= fields.ingre_name
                ingre.description= fields.ingre_description
                ingre.LanguageId= fields.ingre_lang
                ingre.SeasonId= fields.ingre_season
                ingre.IngredientOriginId= fields.ingre_origin
                try {
                    if (fs.existsSync(ingre.imagePath)) {
                        fs.unlink(ingre.imagePath, (err) => {
                            if (err) {
                                console.error(err)
                                return
                            }
                            let newpath = `./static/images/ingredient_images/${ingre.id}/${files['ingre_image'].name}`
                            mv(files['ingre_image'].path,newpath, {mkdirp: true},err=>{
                                if (err) throw err;
                                ingre.imagePath = newpath
                                ingre.save()
                                res.status(201).json(ingre)
                            })

                        })
                    }
                    else {
                        let newpath = `./static/images/ingredient_images/${ingre.id}/${files['ingre_image'].name}`
                        mv(files['ingre_image'].path,newpath, {mkdirp: true},err=>{
                            if (err) throw err;
                            ingre.imagePath = newpath
                            ingre.save()
                            res.status(201).json(ingre)
                        })
                    }
                }
                catch (e){
                    console.log(e)
                    res.status(500).send(e)
                }

            }).catch((err)=>{
            console.log(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Recipies."
            });
        });
    })

};

// Delete a Ingredient with the specified id in the request
exports.delete = (req, res) => {
    Ingredient.findByPk(req.params.id).then(async (ingre)=>{
        if (ingre.id != req.params.id) {
            res.status(400).send('Bad request');
        }else {
            try {
            const path = `./static/images/recipe_images/${req.params.id}/`
            const deletedPaths = await del([path], {dryRun: true});
                console.log(deletedPaths)
            Ingredient.destroy({
                where: {
                    id: req.params.id
                }
            }).then(resp => {
                res.sendStatus(200)
            }).catch((erre) => {
                console.log(erre)
                res.status(500).send({
                    message:
                        erre.message || "Some error occurred while destoying the ingredient."
                });
            })


        }
        catch (e){
            console.log(e)
            res.status(500).send(e)
        }}

    }).catch(err=>{
        res.status(400).send(err||'Bad request');
    })

};

const deleteFolderRecursive = function(path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file) {
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};