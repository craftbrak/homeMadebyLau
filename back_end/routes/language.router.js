module.exports = app => {
    const language = require("../controllers/language.controller");

    var router = require("express").Router();

    // Retrieve all language
    router.get("/", language.findAll);

    // Retrieve a single language with id
    router.get("/:id", language.findOne);

    app.use('/api/languages', router);
};