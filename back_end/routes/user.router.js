const {verifyAuth} = require("../utils/homemade_library");
module.exports = app => {
    const user = require("../controllers/user.controller");

    var router = require("express").Router();

    //is email aleready used
    router.get('/:email',user.verifyEmail)
    //retrieve a user's data
    router.get('/',verifyAuth,user.getUser)
    // create a User
    router.post("/", user.create);

    // Update a User
    router.put("/:id",verifyAuth, user.update);

    // delete a single user
    router.delete("/:id",verifyAuth, user.delete);

    app.use('/api/user', router);
};