const db = require("../models");
const Season = db.Season;
const Op = db.Sequelize.Op;

// Retrieve all Recipes from the database.
exports.findAll = (req, res) => {
    Season.findAll({
        attributes:['id','code','full_name']
    })
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Seasons."
            });
        });

};

// Find a single Season with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Season.findByPk(id,{
        attributes:['id','code','full_name']
    })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Season with id=" + id
            });
        });
};


