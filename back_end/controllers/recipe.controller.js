const db = require("../models");
const mv = require("mv")
const Recipe = db.Recipe;
const Op = db.Sequelize.Op;
const formidable = require('formidable');
validation = require("../utils/homemade_library")
// Create and Save a new Recipe
exports.create =(req, res) => {
    let form = new formidable.IncomingForm({ multiples: true });
    form.parse(req,(err, fields,files )=>{
        if(fields){
            if (validation.ObjectExistNoNullField(fields)){
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
    Recipe.findAll({include :[
            {
                model: db.Ingredient
            },
            {
                model: db.Recipe_Image
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
            if (validation.ObjectExistNoNullField(fields)){
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
        res.status(200).send();
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
    db.Recipe_Ingredient.findAll({
        where: {
            RecipeId: req.params.id
        },
        include :[
            {
                model: db.Ingredient_Origin
            }
        ]

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
    db.Recipe_Ingredient.findOne({
        where: {
           RecipeId: req.params.id,
           IngredientId: req.params.idI
        },
        include :[
            {
                model: db.Ingredient_Origin
            }
        ]

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
    if (validation.ObjectExistNoNullField(req.body)&& validation.ObjectExistNoNullField(req.params.id)){
        Recipe.findByPk(req.params.id).then(recipe=>{
            db.Ingredient.findByPk(req.body.ingredientId).then((ingre)=>{
                recipe.addIngredient( ingre,{through: {quantity: req.body.quantity, UnitId: req.body.unitId }})
            })
        })
            .then(() => {
                res.status(200).send();
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
    if (validation.ObjectExistNoNullField(req.body)&& validation.ObjectExistNoNullField(req.params.id)){
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
                res.status(200).send();
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
    if (validation.ObjectExistNoNullField(req.params)){
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
        fs.unlink(img.image_path, (err) => {
            if (err) {
                console.error(err)
                return
            }
            db.Recipe_Image.destroy({
                where: {
                    id: req.params.id,
                    RecipeId: req.params.idI
                }
            }).then(()=>{
                createImage(req,res)
            })

        })
    })

}
// Delete a image of a recipe.
exports.deleteImage =async (req, res) => {
    db.Recipe_Image.findByPk(req.params.idI).then(img =>{
        fs.unlink(img.image_path, (err) => {
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
                res.sendStatus(200)
            })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while deleting an image."
                    });
                });
        })
    })
};

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
                    res.status(201).json(resp)
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