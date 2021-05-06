const db = require("../models");
const Unit = db.Unit;
const Op = db.Sequelize.Op;

// Create and Save a new Unit
exports.create = (req, res) => {
    Unit.create({full_name: req.body.full_name ,code:req.body.code}).then((resp)=>{
        res.status(202).send(resp)
    })
};

// Retrieve all Recipes from the database.
exports.findAll = (req, res) => {
    Unit.findAll()
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

// Find a single Unit with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Unit.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Unit with id=" + id
            });
        });
};

// Update a Unit by the id in the request
exports.update = (req, res) => {

};

// Delete a Unit with the specified id in the request
exports.delete =async (req, res) => {
    await Unit.destroy({
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