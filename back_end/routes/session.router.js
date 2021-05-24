const {verifyAuth} = require("../utils/homemade_library");
module.exports = app => {
    const session = require("../controllers/session.controller");

    var router = require("express").Router();

    // Retrieve all language
    router.delete("/logout",verifyAuth, session.logout);

    // Retrieve a single language with id
    router.post("/login", session.login);

    //refresh a token
    router.post("/refresh",session.refreshAccessToken)

    app.use('/api/session', router);
};