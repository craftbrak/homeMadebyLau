const db = require("../models");
const Ingredient = db.Ingredient;
const Op = db.Sequelize.Op;

// Create and Save a new Ingredient
exports.create = (req, res) => {
    Ingredient.create({name: "test" ,description:"azeetetst",imagePath: "/static/images/ingredient_images/testImage.jpg"})
     .then((ingre) => {
         ingre.setIngredient_Origin(1)
         ingre.setLanguage(1)
         ingre.setSeason(1)
         res.status(201)
     }).catch((err)=>{
         console.log(err)
    });

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
    Ingredient.findByPk(id)
        .then(data => {
            res.send(data);
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

};


// Find the origin of an Ingredient
exports.findOrigin = (req, res) => {

};
// Update the origin of an Ingredient
exports.UpdateOrigin = (req, res) => {

};