module.exports = app => {
    const session = require("../controllers/session.controller");

    var router = require("express").Router();

    // Retrieve all language
    router.post("/logout", session.loggout);

    // Retrieve a single language with id
    router.post("/login", session.login);

    app.use('/api/session', router);
};