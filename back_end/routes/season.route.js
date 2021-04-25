module.exports = app => {
    const season = require("../controllers/season.controller");

    var router = require("express").Router();

    // Retrieve all season
    router.get("/", season.findAll);

    // Retrieve a single season with id
    router.get("/:id", season.findOne);

    app.use('/api/seasons', router);
};