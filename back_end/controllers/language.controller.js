const db = require("../models");
const Language = db.Language;
const Op = db.Sequelize.Op;

// Retrieve all Recipes from the database.
exports.findAll = (req, res) => {
    Language.findAll()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Units."
            });
        });

};

// Find a single Language with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Language.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Language with id=" + id
            });
        });
};

// Update a Language by the id in the request
exports.update = (req, res) => {

};

// Delete a Language with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Language from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Language
exports.findAllPublished = (req, res) => {

};