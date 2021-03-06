const {verifyAuth, verifyAdmin} = require("../utils/homemade_library");
module.exports = app => {
    const recipes = require("../controllers/recipe.controller");

    var router = require("express").Router();

    // Retrieve all Recipe
    router.get("/", recipes.findAll);
    // Create a new Recipe
    router.post("/",verifyAuth, verifyAdmin, recipes.create);


    // Retrieve a single Recipe with id
    router.get("/:id", recipes.findOne);
    // Update a Recipe with id
    router.put("/:id",verifyAuth, verifyAdmin, recipes.update);
    // Delete a Recipe with id
    router.delete("/:id",verifyAuth, verifyAdmin, recipes.delete);


    //Retrieve all ingredient of a recipe
    router.get("/:id/ingredient", recipes.findAllIngredient)
    //Add a new ingredient in a recipe
    router.post("/:id/ingredient",verifyAuth, verifyAdmin, recipes.addIngredient);


    //Retrieve all ingredient of a recipe
    router.get('/:id/image', recipes.findAllImage)
    //Add a new image in a recipe
    router.post("/:id/image",verifyAuth, verifyAdmin, recipes.addImage)




    //Retrieve a Ingredient of a recipe
    router.get("/:id/ingredient/:idI", recipes.findOneIngredient)
    //Update a Ingredient of a recipe
    router.put("/:id/ingredient/:idI",verifyAuth, verifyAdmin, recipes.updateIngredient);
    //Delete a ingredient of a recipe
    router.delete("/:id/ingredient/:idI",verifyAuth, verifyAdmin, recipes.deleteIngredient)


    //Retrieve a image of a recipe
    router.get("/:id/image/:idI", recipes.findOneImage)
    //Update a Image of a recipe
    router.put("/:id/image/:idI",verifyAuth, verifyAdmin, recipes.updateImage);
    //Delete a Image of a recipe
    router.delete("/:id/image/:idI",verifyAuth, verifyAdmin, recipes.deleteImage)


    router.get("/:id/comments", recipes.getAllComments)
    router.get("/:id/comments/:idCom", recipes.getOneComment)
    router.post("/:id/comments", verifyAuth, recipes.addComment)
    router.put("/:id/comments/:idCom", verifyAuth, recipes.updateComment)
    router.delete("/:id/comments/:idCom", verifyAuth, recipes.deleteComment)
    router.post("/:id/comments/:idCom/response", verifyAuth, recipes.addResponse)
    router.delete("/:id/comments/:idCom/response/:idResp", verifyAuth, recipes.removeResponse)
    app.use('/api/recipe', router);
};