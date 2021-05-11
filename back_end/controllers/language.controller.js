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
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Language with id=" + id
            });
        });
};
