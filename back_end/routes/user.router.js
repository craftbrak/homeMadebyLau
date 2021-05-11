module.exports = app => {
    const user = require("../controllers/user.controller");

    var router = require("express").Router();

    //is email aleready used
    router.get('/:email',user.verifyEmail)
    // create a User
    router.post("/", user.create);

    // Update a User
    router.put("/:id", user.update);

    // delete a single user
    router.delete("/:id", user.delete);

    app.use('/api/user', router);
};