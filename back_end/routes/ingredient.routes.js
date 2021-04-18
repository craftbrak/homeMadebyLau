module.exports = app => {
    const ingredients = require("../controllers/ingredient.controller");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", ingredients.create);

    // Retrieve all Tutorials
    router.get("/", ingredients.findAll);

    // Retrieve all published Tutorials
    router.get("/published", ingredients.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", ingredients.findOne);

    // Update a Tutorial with id
    router.put("/:id", ingredients.update);

    // Delete a Tutorial with id
    router.delete("/:id", ingredients.delete);

    // Delete all Tutorials
    router.delete("/", ingredients.deleteAll);

    app.use('/api/ingredient', router);
};