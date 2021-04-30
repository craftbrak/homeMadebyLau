const dbConfig = require("../config/db.config.js");
const { Sequelize ,DataTypes} = require('sequelize');
const sequelize = new Sequelize({
    dialect: dbConfig.dialect,
    storage: dbConfig.storage,
    logging: false
});

const db={}

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Recipe = require('./recipe.model')(sequelize,DataTypes)
db.Ingredient = require('./ingredient.model')(sequelize,DataTypes)
db.Recipe_Image = require('./recipe_image.model')(sequelize,DataTypes)
db.Ingredient_Origin = require('./ingredient_origin.model')(sequelize,DataTypes)
db.Recipe_Ingredient = require('./recipe_ingredient.model')(sequelize,DataTypes)
db.Unit = require('./unit.model')(sequelize,DataTypes)
db.Season = require('./season.model')(sequelize,DataTypes)
db.Language = require('./language.model')(sequelize,DataTypes)

db.Recipe.associate(sequelize.models)
db.Ingredient.associate(sequelize.models)
db.Recipe_Image.associate(sequelize.models)
db.Ingredient_Origin.associate(sequelize.models)
db.Recipe_Ingredient.associate(sequelize.models)
db.Unit.associate(sequelize.models)
db.Season.associate(sequelize.models)
db.Language.associate(sequelize.models)

db.initStatic = ()=>{
    db.Unit.create({full_name: "gramme", code: "g"})
    db.Unit.create({full_name: "mili_litter", code: "ml"})
    db.Unit.create({full_name: "teaspoon", code: "te"})
    db.Unit.create({full_name: "tablespoon", code: "ta"})

    db.Language.create({full_name: 'Français', code: 'fr_FR'})
    db.Language.create({full_name: 'English', code: 'en_EN'})

    db.Season.create({full_name: "winter", code: 'WI'})
    db.Season.create({full_name: "spring", code: 'SP'})
    db.Season.create({full_name: "summer", code: 'SU'})
    db.Season.create({full_name: "fall", code: 'FA'})

    db.Ingredient_Origin.create({name: "test" ,description:"azeetetst",image_path: "/static/images/ingredient_images/testImage.jpg",address:"Rue joseph boulanmerd 20 4550 belgiqaque",website: "https://www.thispersonedeosnotexist.com", phone_number: "0458987452",email: "test@homemadebylau.be", LanguageId: 1})
    db.Ingredient_Origin.create({name: "testzaazea" ,description:"azeetetst",image_path: "/static/images/ingredient_images/testImage.jpg",address:"Rue joseph boulanmerd 20 4550 belgiqaque",website: "https://www.thispersonedeosnotexist.com", phone_number: "0458987452",email: "test@homemadebylau.be", LanguageId: 2})

    db.Ingredient.create({name: "test" ,description:"azeetetst",imagePath: "/static/images/ingredient_images/testImage.jpg",LanguageId: 1, SeasonId: 1,IngredientOriginId: 1})
    db.Ingredient.create({name: "test" ,description:"azeetetst",imagePath: "/static/images/ingredient_images/testImage.jpg",LanguageId: 1, SeasonId: 3,IngredientOriginId: 2})
}

module.exports = db;