
const {verifyAuth, verifyAdmin} = require("../utils/homemade_library");
module.exports = app => {
    const ingredients = require("../controllers/ingredient.controller");

    var router = require("express").Router();

    // Create a new Ingredient
    router.post("/",verifyAuth, verifyAdmin, ingredients.create);

    // Retrieve all Ingredient
    router.get("/", ingredients.findAll);

    // Retrieve a single Ingredient with id
    router.get("/:id", ingredients.findOne);

    // Update a Ingredient with id
    router.put("/:id",verifyAuth, verifyAdmin, ingredients.update);

    // Delete a Ingredient with id
    router.delete("/:id",verifyAuth, verifyAdmin, ingredients.delete);

    app.use('/api/ingredient', router);
};