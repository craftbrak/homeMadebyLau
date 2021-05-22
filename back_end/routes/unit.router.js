const {verifyAuth, verifyAdmin} = require("../utils/homemade_library");
module.exports = app => {
    const unit = require("../controllers/unit.controller");

    var router = require("express").Router();

    // Create a new unit
    router.post("/",verifyAuth, verifyAdmin, unit.create);

    // Retrieve all unit
    router.get("/", unit.findAll);

    // Retrieve a single unit with id
    router.get("/:id", unit.findOne);

    // Update a unit with id
    router.put("/:id",verifyAuth, verifyAdmin, unit.update);

    // Delete a unit with id
    router.delete("/:id",verifyAuth, verifyAdmin, unit.delete);


    app.use('/api/units', router);
};