const {verifyAuth, verifyAdmin} = require("../utils/homemade_library");
module.exports = app => {
    const workshop = require("../controllers/workshop.controller");

    var router = require("express").Router();

    // Create a new workshop
    router.post("/",verifyAuth, verifyAdmin, workshop.create);

    // Retrieve all workshop
    router.get("/",verifyAuth, workshop.getAll );

    // Retrieve a single workshop with id
    router.get("/:id", workshop.getOne);

    // Update a workshop with id
    router.put("/:id",verifyAuth, verifyAdmin, workshop.update);

    // Delete a workshop with id
    router.delete("/:id",verifyAuth, verifyAdmin, workshop.delete);

    router.post("/:id/recipe",verifyAuth,verifyAdmin,workshop.addRecipe)
    router.delete("/:id/recipe/idR",verifyAuth,verifyAdmin,workshop.deleteRecipe)

    router.post("/:id/user", verifyAuth, workshop.subscribeUser)
    router.delete("/:id/user/:idUser", verifyAuth, workshop.unSubscribeUser)

    router.get('/:id/totalSubscribed',workshop.getTotalSubs)

    router.post('/:id/verify/', verifyAuth, workshop.sendVerifyWorkshopSubscription)
    router.get('/:id/verify/:tokken', workshop.validateSubscription)
    app.use('/api/workshop', router);
};