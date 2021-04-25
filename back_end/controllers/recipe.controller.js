const db = require("../models");
const Recipe = db.Recipe;
const Op = db.Sequelize.Op;

// Create and Save a new Recipe
exports.create =async (req, res) => {
    Recipe.create({
        name: req.body.recipe_name ,
        description:req.body.recipe_description,
        language:req.body.recipe_language,
        season:req.body.recipe_season,
        unfolding: req.body.recipe_unfloding,
        timeToPrepare:req.body.recipe_timeToPrepare,
        cookingTime: req.body.recipe_cookingTime})
        .then((recipe)=>{
           for (ingredient of req.body.recipe_Ingredients){
               console.log(ingredient)
                db.Ingredient.findByPk(ingredient.ingId).then((ingre)=>{
                    recipe.addIngredients( ingre, {quantity: ingredient.quatity, unit: ingredient.Iunit
                    })})
            }
            // for (image in req.body.recipe_images){
            //     db.Recipe_Image.create({
            //         img:image.img,
            //         caption : image.caption
            //     }).then((imag) => {
            //         recipe.addRecipe_Images(imag)
            //     });
            //
            // }
        }).then(() => {
            res.status(200)
        })
        .catch(err => {
            console.log(err)
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Recipies."
        });
    });
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
    Recipe.findByPk(id)
        .then(data => {
            res.status(200).json(data);
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

// Delete all Recipe from the database.
exports.deleteAll =async (req, res) => {
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

// Find all published Recipe
exports.findAllPublished = (req, res) => {

};
// Add ingredeint to a Recipe
exports.addIngredient = (req ,res) => {
    db.Ingredient.findByPk(ingredient.ingId).then((ingre)=>{
        recipe.addIngredients( ingre, {quantity: ingredient.quatity, unit: ingredient.Iunit
        })})
};


