const db = require("../models");
const Ingredient = db.Ingredient;
const Op = db.Sequelize.Op;

// Create and Save a new Ingredient
exports.create = (req, res) => {
    const recipe = Ingredient.create({name: "test" ,description:"azeetetst",language:'En',season:"automn",unfolding: "edsqdazdqsdzqsd", timeToPrepare: 45})
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

// Delete all Ingredient from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Ingredient
exports.findAllPublished = (req, res) => {

};