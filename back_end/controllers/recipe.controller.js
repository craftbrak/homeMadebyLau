const db = require("../models");
const mv = require("mv")
const Recipe = db.Recipe;
const Op = db.Sequelize.Op;
const formidable = require('formidable');
const fs = require("fs");
const {Sequelize} = require("sequelize");

const { ObjectExistNoNullField }= require("../utils/homemade_library");
// Create and Save a new Recipe
exports.create =(req, res) => {
    let form = new formidable.IncomingForm({ multiples: true });
    form.parse(req,(err, fields,files )=>{
        if(fields){
            if (ObjectExistNoNullField(fields)){
                Recipe.create({
                    name: fields.recipe_name ,
                    description:fields.recipe_description,
                    LanguageId:fields.recipe_language,
                    SeasonId:fields.recipe_season,
                    unfolding: fields.recipe_unfloding,
                    timeToPrepare:fields.recipe_timeToPrepare,
                    cookingTime: fields.recipe_cookingTime,
                })
                    .then((data) => {
                    res.status(201).json(data)
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while retrieving Recipies."
                        });
                    });
            }
            else {
                res.status(400).send(
                    {
                        message:
                            "Some value was not correct"
                    }
                )
            }
        }
    })



};
// Retrieve all Recipes from the database.
exports.findAll = async(req, res) => {
    const seasson = req.query.seasonId;
    const language = req.query.languageId;
    const orderC = req.query.orderColumn;
    const orderS = req.query.orderDirection
    // const ingredient = req.query.ingredient;
    let where = {};
    let order =['id','ASC']
    if(seasson) where.SeasonId = seasson
    if(language) where.LanguageId = language
    if(orderC) {
        order[0] = orderC
        if (orderS) order[1] = orderS
        else order[1] = 'ASC'
    }

    Recipe.findAll({include :[
            {
                model: db.Recipe_Image,
                attributes:['id']
            }
        ],
        attributes:['id','name','description','imageNumber','LanguageId','SeasonId','timeToPrepare','cookingTime'],
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
// Find a single Recipe with an id
exports.findOne =async (req, res) => {
    const id = req.params.id;
    Recipe.findByPk(id,{include :[
            {
                model: db.Ingredient
            },
            {
                model: db.Recipe_Image
            }
        ]

    })
        .then(data => {
            if (data === null){
                res.status(204).send({
                    message:"Error retrieving Recipe with id=" + id+"does not exist "
                })
            }
            else {
                res.status(200).json(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Recipe with id=" + id+". "
            });
        });
};
// Update a Recipe by the id in the request
exports.update =async (req, res) => {
    let form = new formidable.IncomingForm({ multiples: true });
    form.parse(req,(err, fields,files )=>{
        if(fields){
            if (ObjectExistNoNullField(fields)){
                Recipe.findByPk(req.params.id)
                    .then(recipe =>{
                        recipe.name= fields.recipe_name
                        recipe.description=fields.recipe_description
                        recipe.LanguageId=fields.recipe_language
                        recipe.SeasonId=fields.recipe_season
                        recipe.unfolding= fields.recipe_unfloding
                        recipe.timeToPrepare=fields.recipe_timeToPrepare
                        recipe.cookingTime= fields.recipe_cookingTime
                        recipe.save()
                        res.status(201).json(recipe)
                        })
                    .catch(err => {
                        console.log(err)
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while retrieving Recipies."
                        });
                    });
            }
            else {
                res.status(400).send(
                    {
                        message:
                            "Some value was not correct"
                    }
                )
            }
        }
    })
};
// Delete a Recipe with the specified id in the request
exports.delete =async (req, res) => {
    await Recipe.destroy({
        where: {
            id: req.params.id
        }
    },{include :[
            {
                model: db.Ingredient
            },
            {
                model: db.Recipe_Image
            }
        ]

    })
    .then(() => {
        try {
            if (fs.existsSync(`./static/images/recipe_images/${req.params.id}`)){
                fs.unlink(`./static/images/recipe_images/${req.params.id}`,err => {
                    res.status(200).send({message: `the recipe with the id ${req.params.id} has been deleted`})
                })
            }
        }catch (e){
            res.status(500).send({
                message:
                    err.message || `Some error occurred while deleting the Recipie with the id :${req.params.id}.`
            });
        }
    })
    .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while deleting the Recipie with the id :${req.params.id}.`
            });
        });
};


// Retrieve all Ingredient of a recipe
exports.findAllIngredient = (req, res) => {
    Recipe.findAll({
        where: {
            id: req.params.id
        },
        include: [
            {
                model:db.Ingredient,
                through: {
                    model : db.Recipe_Ingredient
                    ,attributes :['quantity','UnitId']
                },
                attributes :['id','imagePath',"name"]
            }
        ]
        ,attributes :['id']

    })
        .then(resp=>{
            res.status(200).json(resp)
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while retrieving all ingerdients with the id :${req.params.id}.`
            });
        });
}

// Retrieve one Ingredient of a recipe
exports.findOneIngredient = (req, res) => {
    Recipe.findAll({
        where: {
            id: req.params.id
        },
        include: [
            {
                model:db.Ingredient,
                through: {
                    model : db.Recipe_Ingredient
                    ,attributes :['quantity','UnitId']
                },
                where: {
                    id : req.params.idI
                }
            }
        ]
        ,attributes :['id']

    })
        .then(resp=>{
            res.status(200).json(resp)
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while retrieving the ingerdient with the id :${req.params.id}.`
        });
    });
}

// Add ingredient to a Recipe
exports.addIngredient = (req ,res) => {
    if (ObjectExistNoNullField(req.body)&& ObjectExistNoNullField(req.params.id)){
        Recipe.findByPk(req.params.id).then(recipe=>{
            db.Ingredient.findByPk(req.body.ingredientId).then((ingre)=>{
                recipe.addIngredient( ingre,{through: {quantity: req.body.quantity, UnitId: req.body.unitId }})
                res.status(201).send(ingre);
            })
        })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || `Some error occurred while adding an ingredient to the Recipie with the id :${req.params.id}.`
                });
            });
    }
    else {
        res.status(400).send({
            message:
                "Some value was not correct"
        });
    }
};
// Update a Ingredient of a recipe.
exports.updateIngredient = (req ,res) => {
    if (ObjectExistNoNullField(req.body)&& ObjectExistNoNullField(req.params.id)){
        db.Recipe_Ingredient.findOne({
            where: {
                RecipeId: req.params.id,
                IngredientId: req.params.idI,
            }
        })
            .then((ingre) => {
                ingre.quantity = req.body.quantity
                ingre.UnitId = req.body.UnitId
                ingre.save()
                res.status(200).send(ingre);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || `Some error occurred while adding an ingredient to the Recipie with the id :${req.params.id}.`
                });
            });
    }
    else {
        res.status(400).send({
            message:
                "Some value was not correct"
        });
    }
}
// Delete a ingredient of a recipe.
exports.deleteIngredient = (req, res) =>{
    if (ObjectExistNoNullField(req.params)){
        db.Recipe_Ingredient.destroy({
            where:{
                RecipeId: req.params.id,
                IngredientId: req.params.idI
            }
        })
            .then(resp=>{
                res.sendStatus(200)
            })
            .catch(err=>{
                res.status(500).send({
                    message:
                        err.message || `Some error occurred while deleting the Ingredient with the id :${req.params.id}.`
                })
            })
    }
    else {
        res.status(400).send({
            message:
                "Some value was not correct"
        });
    }
}


// Retrieve all image of a recipe
exports.findAllImage = (req, res) => {
    db.Recipe_Image.findAll({
        where: {
            RecipeId: req.params.id
        },
        attributes:["id","imgpath","RecipeId"]
    })
        .then(recipe=>{
        res.status(200).json(recipe)
    })
        .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retreiving an image."
        });
    });
}
// Retrieve one Ingredient of a recipe
exports.findOneImage = (req, res) => {
    db.Recipe_Image.findByPk(req.params.idI,{
        attributes:["id","imgpath","RecipeId"]
    })
        .then(resp=>{
            res.status(200).send(resp)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retreiving an image."
            });
        });
}
// Add image to a Recipe
exports.addImage = (req,res) => {
    createImage(req,res)
}
// Update a Image of a recipe.
exports.updateImage = (req ,res) => {
    db.Recipe_Image.findByPk(req.params.idI).then(img =>{
        if (img){
            try {
                if (fs.existsSync(img.imgpath)) {
                    fs.unlink(img.imgpath, (err) => {
                        if (err) {
                            console.error(err)
                            return
                        }
                        db.Recipe_Image.destroy({
                            where: {
                                id: req.params.idI,
                                RecipeId: req.params.id
                            }
                        }).then(()=>{
                            Recipe.findByPk(req.params.id).then(recipe=>{
                                recipe.imageNumber --
                                recipe.save()
                            })
                            createImage(req,res)
                        })

                    })
                }
                else {
                    db.Recipe_Image.destroy({
                        where: {
                            id: req.params.idI,
                            RecipeId: req.params.id
                        }
                    }).then(()=>{
                        Recipe.findByPk(req.params.id).then(recipe=>{
                            recipe.imageNumber --
                            recipe.save()
                        })
                        createImage(req,res)
                    })
                }

            }
            catch (e){
                console.log(e)
                res.status(500).send(e)
            }
        }
        else {
            res.status(400).send('wrong request')
        }


    }).catch(err=>{
        res.status(400).send({
            message:
                "Some value was not correct"
        });
    })

}
// Delete a image of a recipe.
exports.deleteImage =async (req, res) => {
    db.Recipe_Image.findByPk(req.params.idI).then(img =>{
        if (img){
            if(fs.existsSync(img.path)){
                fs.unlink(img.imgpath, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                    db.Recipe_Image.destroy({
                        where:{
                            id : req.params.idI,
                            RecipeId: req.params.id
                        }
                    }).then(()=>{
                        Recipe.findByPk(req.params.id).then(recipe=>{
                            recipe.imageNumber --
                            recipe.save()
                        })
                        res.status(200).send({message: `the image of the recipe with the id ${req.params.id} has been deleted`})
                    })
                        .catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while deleting an image."
                            });
                        });
                })
            }
            else {
                db.Recipe_Image.destroy({
                    where:{
                        id : req.params.idI,
                        RecipeId: req.params.id
                    }
                }).then(()=>{
                    Recipe.findByPk(req.params.id).then(recipe=>{
                        recipe.imageNumber --
                        recipe.save()
                    })
                    res.status(200).send({message: `the image of the recipe with the id ${req.params.id} has been deleted`})
                })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while deleting an image."
                        });
                    });
            }
        }
        else {
            res.status(400).send('wrong request')
        }

    })
};

exports.addComment  = (req, res) => {
    if (!ObjectExistNoNullField(req.body)) return req.sendStatus(400)
    Recipe.findByPk(req.params.id).then(recipe =>{
        db.Comment.create({
            text: req.body.comtext,
            RecipeId: recipe.id,
            UserId: req.user.id,
        })
            .then(com =>{
                res.status(202).send(com)
            })
            .catch(err=>{
                throw err
                res.sendStatus(500)
            })

    })
        .catch(err=>{
            throw err
            res.sendStatus(500)
        })
};

exports.updateComment = (req, res) => {
    if (!ObjectExistNoNullField(req.body)) return req.sendStatus(400)
    db.Comment.findByPk(req.params.idCom)
        .then(com =>{
            if (req.user.id !== com.UserId) return res.sendStatus(403)
            com.text = req.body.comtext
            com.save()
                .then(()=>{
                    res.status(202).send(com)
                })
        })
        .catch(err=>{
            throw err
            res.sendStatus(500)
        })
}

exports.getAllComments = (req, res) =>{
    db.Comment.findAll({
        where:{
            RecipeId: req.params.id
        },
        include:[ {
            association:'answering',
            attributes : ['id'],
            through: {
                attributes :[]
            }
            },
            {
                association :'answer',
                attributes:['id'],
                through: {
                    attributes: []
                }
            }]
    })
        .then(coms => {
            res.status(200).send(coms)
        })
        .catch(err =>{
            throw err
            res.sendStatus(500)
        })
}

exports.getOneComment = (req ,res) => {
    db.Comment.findByPk(req.params.idCom,{
        include:[ {
            association:'answering',
            attributes : ['id'],
            through: {
                attributes :[]
            }
        },
            {
                association :'answer',
                attributes:['id'],
                through: {
                    attributes: []
                }
            }]
    })
        .then(com =>{
            res.status(200).send(com)
        })
        .catch(err =>{
            throw err
            res.sendStatus(500)
        })
}

exports.deleteComment = (req, res) => {
    db.Comment.findByPk(req.params.idCom)
        .then(com =>{
            com.destroy()
            res.status(204).send(com)
        })
        .catch(err =>{
            throw err
            res.sendStatus(500)
        })
}

exports.addResponse = (req, res) => {
    if (!ObjectExistNoNullField(req.body)) return res.sendStatus(400)
    Recipe.findByPk(req.params.id).then(recipe =>{
        db.Comment.create({
            text: req.body.comtext,
            RecipeId: recipe.id,
            UserId: req.user.id,
        })
            .then(com =>{
                if (com.id == req.params.idCom) return res.sendStatus(400)
                db.sequelize.models.comments_responses.create({
                    responseId: com.id,
                    responsingId: req.params.idCom
                })
                    .then(reps=>{
                    res.status(202).send(com)
                })
                    .catch(err=>{
                        throw err
                        res.sendStatus(500)
                    })

            })
            .catch(err =>{
                throw err
                res.sendStatus(500)
            })

    })
        .catch(err=>{
            res.sendStatus(500)
        })
}

exports.removeResponse = (req, res) => {
    db.sequelize.models.comments_responses.findOne({
        where:{
            responseId: req.params.idResp,
            responsingId: req.params.idCom
        }
    }).then(()=>{
        db.Comment.findByPk(req.params.idResp)
            .then(com =>{
                com.destroy()
                res.status(204).send(com)
            })
            .catch(err =>{
                throw err
                res.sendStatus(500)
            })
    })
}


const createImage = (req,res) => {
    let form = new formidable.IncomingForm({ multiples: true });
    form.parse(req,(err, fields,files)=>{
        if (fields && validation.ObjectExistNoNullField(files)){
            let oldpath = files.file.path;
            let newpath ='./static/images/recipe_images/'+ req.params.id+'/'+ files.file.name;
            mv(oldpath, newpath, {mkdirp: true}, function (err) {
                if (err) throw err;
                db.Recipe_Image.create({
                    imgpath: newpath,
                    RecipeId: req.params.id
                }).then(resp => {
                    Recipe.findByPk(req.params.id)
                        .then(recipe=>{
                        recipe.imageNumber ++
                        recipe.save()
                        })
                        .then(()=>{
                            res.status(201).json(resp)
                        })
                        .catch(err =>{
                        res.status(500).send({
                            message:
                                err.message || `Some error occurred while adding an image to the Recipie with the id :${req.params.id}.`
                        });
                    })
                }).catch(err =>{
                    res.status(500).send({
                        message:
                            err.message || `Some error occurred while adding an image to the Recipie with the id :${req.params.id}.`
                    });
                })
            })
        }
        else {
            res.status(400).send({
                message:
                    "Some value was not correct"
            });
        }
    })
}