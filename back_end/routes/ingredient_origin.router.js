const {verifyAuth,  verifyAdmin} = require("../utils/homemade_library");
module.exports = app => {
    const origin = require("../controllers/ingredient_orign.controller");

    var router = require("express").Router();

    // Create a new origin
    router.post("/",verifyAuth, verifyAdmin, origin.create);

    // Retrieve all origin
    router.get("/", origin.findAll);

    // Retrieve a single origin with id
    router.get("/:id", origin.findOne);

    // Update a origin with id
    router.put("/:id",verifyAuth, verifyAdmin, origin.update);

    // Update a origin's image with id
    router.put("/:id/image",verifyAuth, verifyAdmin, origin.changeImage);

    // Delete a origin with id
    router.delete("/:id",verifyAuth, verifyAdmin, origin.delete);


    app.use('/api/ingredient_origin', router);
};