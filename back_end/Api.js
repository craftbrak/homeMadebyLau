const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const port = 8080;
const { Sequelize ,DataTypes} = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './homeMadeByLau.sqlite'
});
const Recipe = require('./models/recipe')(sequelize,DataTypes)
const Ingredient = require('./models/ingredient')(sequelize,DataTypes)
const Recipe_Image =require('./models/recipe_image')(sequelize,DataTypes)
const Ingredient_Origin =require('./models/ingredient_origin')(sequelize,DataTypes)
Recipe.associate(sequelize.models)
Ingredient.associate(sequelize.models)
Recipe_Image.associate(sequelize.models)
Ingredient_Origin.associate(sequelize.models)

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/recipe', async (req,res) => {
    const recipes = await Recipe.findAll({include :[
            {
                model: Ingredient
            },
            {
                model: Recipe_Image
            }
        ]

    });
    res.status(200).json(recipes)
})

app.get('/recipe/:id', async (req,res) => {
    const id = parseInt(req.params.id)
    const recipe = await Recipe.findByPk(id,{include :[
            {
                model: Ingredient
            },
            {
                model: Recipe_Image
            }
        ]

    })
    res.status(200).json(recipe)
})

app.post('/recipe', async (req ,res)=>{
    req.body
    const recipe = await Recipe.create({name: "test" ,description:"azeetetst",language:'En',season:"automn",unfolding: "edsqdazdqsdzqsd", timeToPrepare: 45})
})



app.get('/ingredient', async (req,res) => {
    const ingredients = await Ingredient.findAll({include :Ingredient_Origin })
    res.status(200).json(ingredients)
})

app.get('/ingredient/:id', async (req,res) => {
    const id = parseInt(req.params.id)
    const ingredient = await Ingredient.findByPk(id,{include: Ingredient_Origin})
    res.status(200).json(ingredient)
})

app.post('/ingredient', async (req ,res)=>{
    req.body
    const recipe = await Ingredient.create({name: "test" ,description:"azeetetst",language:'En',season:"automn",unfolding: "edsqdazdqsdzqsd", timeToPrepare: 45})
})

http.listen(port,async ()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({ force: true });
        console.log("listenig to port " + port)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

});