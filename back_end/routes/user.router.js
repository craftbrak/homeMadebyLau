const {verifyAuth} = require("../utils/homemade_library");
module.exports = app => {
    const user = require("../controllers/user.controller");

    var router = require("express").Router();

    //is email aleready used
    router.get('/:email',user.verifyEmail);
    //retrieve a user's data
    router.get('/', verifyAuth, user.getUser);

    router.get('/:id/workshop', verifyAuth, user.subscribedWorkshop);

    router.get('/:id/verify/:tokken',user.verifyUser)

    router.post("/verify",verifyAuth,user.sendVerifyAuthEmail)
    // create a User
    router.post("/", user.create);

    // Update a User
    router.put("/:id",verifyAuth, user.update);

    // delete a single user
    router.delete("/:id",verifyAuth, user.delete);

    app.use('/api/user', router);
};