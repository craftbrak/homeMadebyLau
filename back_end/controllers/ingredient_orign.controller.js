const db = require("../models");
const Ingredient_Origin = db.Ingredient_Origin;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    Ingredient_Origin.create({name: "test" ,
        description:"azeetetst",
        image_path: "/static/images/ingredient_images/testImage.jpg",
        address:"Rue joseph boulanmerd 20 4550 belgiqaque",
        website: "https://www.thispersonedeosnotexist.com",
        phone_number: "0458987452",
        email: "test@homemadebylau.be",
        LanguageId: 1})
        .then((data) => {
            res.status(201).json(data)
        }).catch((err)=>{
        console.log(err)
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Recipies."
        });
    });

};

// Retrieve all Recipes from the database.
exports.findAll = (req, res) => {
    Ingredient_Origin.findAll()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Origins."
            });
        });

};

// Find a single Ingredient_Origin with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Ingredient_Origin.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Ingredient_Origin with id=" + id
            });
        });
};

// Update a Ingredient_Origin by the id in the request
exports.update = (req, res) => {
    res.status(666).send({
        message: "Error retrieving Ingredient_Origin with id=" + id
    });
};

// Delete a Ingredient_Origin with the specified id in the request
exports.delete = (req, res) => {
    res.status(666).send({
        message: "Error retrieving Ingredient_Origin with id=" + id
    });
};