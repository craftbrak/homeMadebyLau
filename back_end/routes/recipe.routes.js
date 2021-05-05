const multer = require('multer');
const upload = multer();
let filetype = upload.any()
module.exports = app => {
    const recipes = require("../controllers/recipe.controller");

    var router = require("express").Router();

    // Retrieve all Recipe
    router.get("/", recipes.findAll);
    // Create a new Recipe
    router.post("/",filetype, recipes.create);


    // Retrieve a single Recipe with id
    router.get("/:id", recipes.findOne);
    // Update a Recipe with id
    router.put("/:id", recipes.update);
    // Delete a Recipe with id
    router.delete("/:id", recipes.delete);


    //Retrieve all ingredient of a recipe
    router.get("/:id/ingredient", recipes.findAllIngredient)
    //Add a new ingredient in a recipe
    router.post("/:id/ingredient", recipes.addIngredient);


    //Retrieve all ingredient of a recipe
    router.get('/:id/image', recipes.findAllImage)
    //Add a new image in a recipe
    router.post("/:id/image", recipes.addImage)




    //Retrieve a Ingredient of a recipe
    router.get("/:id/ingredient/:idI", recipes.findOneIngredient)
    //Update a Ingredient of a recipe
    router.put("/:id/ingredient/:idI", recipes.updateIngredient);
    //Delete a ingredient of a recipe
    router.delete("/:id/ingredient/:idI", recipes.deleteIngredient)


    //Retrieve a image of a recipe
    router.get("/:id/image/:idI", recipes.findOneImage)
    //Update a Image of a recipe
    router.put("/:id/image/:idI", recipes.updateImage);
    //Delete a Image of a recipe
    router.delete("/:id/image/:idI", recipes.deleteImage)

    app.use('/api/recipe', router);
};