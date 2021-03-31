module.exports = app => {
    const recipes = require("../controllers/recipe.controller");

    var router = require("express").Router();

    // Create a new Recipe
    router.post("/", recipes.create);

    //Add a new ingredient in a recipe
    router.post("/:id/ingredient",recipes.addIngredient)

    // Retrieve all Recipe
    router.get("/", recipes.findAll);

    // Retrieve all published Recipe
    router.get("/published", recipes.findAllPublished);

    // Retrieve a single Recipe with id
    router.get("/:id", recipes.findOne);

    // Update a Recipe with id
    router.put("/:id", recipes.update);

    // Delete a Recipe with id
    router.delete("/:id", recipes.delete);

    // Delete all Recipe
    router.delete("/", recipes.deleteAll);

    app.use('/api/recipe', router);
};