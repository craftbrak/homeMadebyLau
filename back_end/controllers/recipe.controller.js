const db = require("../models");
const mv = require("mv")
const Recipe = db.Recipe;
const Op = db.Sequelize.Op;
const formidable = require('formidable');
validation = require("../usfullstuf/homemade_library")
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
                    .then( recipe=>{
                        const ingredients =JSON.parse(fields.recipe_Ingredients)
                        for (let ingredient of ingredients ){
                            if (ingredient !==null){
                                db.Ingredient.findByPk(ingredient.ingId).then( (ingre)=>{
                                recipe.addIngredient( ingre,{through: {quantity: ingredient.quantity, UnitId: ingredient.IUnit }}).catch(
                                    err=>{
                                        console.log(err)
                                    }
                                )})}

                        }
                        for (const filetoupload in files) {
                            let oldpath = files[filetoupload].path;
                            let newpath ='./static/images/recipe_images/'+ recipe.id+'/'+ files[filetoupload].name;
                            mv(oldpath, newpath, {mkdirp: true}, function (err) {
                                if (err) throw err;
                                db.Recipe_Image.create({
                                    imgpath: newpath,
                                    RecipeId: recipe.id
                                });
                            })
                        }
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
                res.status(500).send(
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
    console.log("FIND ALL Ingredient")
}
// Retrieve one Ingredient of a recipe
exports.findOneIngredient = (req, res) => {
    console.log("FIND ONE Ingredient")
}
// Add ingredeint to a Recipe
exports.addIngredient = (req ,res) => {
    Recipe.findByPk(req.params.id).then(recipe=>{
        db.Ingredient.findByPk(req.params.idI).then((ingre)=>{
            recipe.addIngredient( ingre,{through: {quantity: 2, UnitId: ingredient.IUnit }})
        })
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
// Update a Ingredient of a recipe.
exports.updateIngredient = (req ,res) => {
    console.log("Update Ingredient")
    Recipe.findByPk(req.params.id).then((recipe)=>{
        db.Ingredient.findByPk(req.params.idI).then((ingre)=>{
            recipe.setIngredient( ingre,{through: {quantity: 2, UnitId: ingredient.IUnit }})
        })
    }).then(() => {
        res.status(200).send();
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while deleting the Recipie with the id :${req.params.id}.`
            });
        });

}
// Delete a ingredient of a recipe.
exports.deleteIngredient = (req, res) =>{
    console.log("Delete Ingredient")
    recipe.removeIngredient(ingre)
}


// Retrieve all image of a recipe
exports.findAllImage = (req, res) => {
    console.log("FIND ALL IMAGES")
}
// Retrieve one Ingredient of a recipe
exports.findOneImage = (req, res) => {
    console.log("FIND ONE IMAGE")
}
// Add image to a Recipe
exports.addImage = (req,res) => {
    console.log("ADD IMAGES")
}
// Update a Image of a recipe.
exports.updateImage = (req ,res) => {
    console.log("Update image")
}
// Delete a image of a recipe.
exports.deleteImage =async (req, res) => {
    Recipe.destroy().then(()=>{
        res.status(200)
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting Recipies."
            });
        });
};