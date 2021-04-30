module.exports = app => {
    const origin = require("../controllers/ingredient_orign.controller");

    var router = require("express").Router();

    // Create a new origin
    router.post("/", origin.create);

    // Retrieve all origin
    router.get("/", origin.findAll);

    // Retrieve a single origin with id
    router.get("/:id", origin.findOne);

    // Update a origin with id
    router.put("/:id", origin.update);

    // Delete a origin with id
    router.delete("/:id", origin.delete);


    app.use('/api/ingredient_origin', router);
};