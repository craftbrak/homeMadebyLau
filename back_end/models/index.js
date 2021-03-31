const dbConfig = require("../config/db.config.js");
const { Sequelize ,DataTypes} = require('sequelize');
const sequelize = new Sequelize({
    dialect: dbConfig.dialect,
    storage: dbConfig.storage
});

const db={}

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Recipe = require('./recipe.model')(sequelize,DataTypes)
db.Ingredient = require('./ingredient.model')(sequelize,DataTypes)
db.Recipe_Image =require('./recipe_image.model')(sequelize,DataTypes)
db.Ingredient_Origin =require('./ingredient_origin.model')(sequelize,DataTypes)
db.Recipe_Ingredient =require('./recipe_ingredient.model')(sequelize,DataTypes)

db.Recipe.associate(sequelize.models)
db.Ingredient.associate(sequelize.models)
db.Recipe_Image.associate(sequelize.models)
db.Ingredient_Origin.associate(sequelize.models)
db.Recipe_Ingredient.associate(sequelize.models)

module.exports = db;