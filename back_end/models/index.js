const dbConfig = require("../config/db.config.js");
const { Sequelize ,DataTypes} = require('sequelize');
const sequelize = new Sequelize({
    dialect: dbConfig.dialect,
    storage: dbConfig.storage,
    logging: false
});

const db={}
db.sessionSecret = dbConfig.sessionSecret

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
db.User = require('./user.model')(sequelize,DataTypes)
db.RefreshToken = require('./jwtRefreshToken.model')(sequelize, DataTypes)
db.Comment = require('./comment.model')(sequelize, DataTypes)

db.Recipe.associate(sequelize.models)
db.Ingredient.associate(sequelize.models)
db.Recipe_Image.associate(sequelize.models)
db.Ingredient_Origin.associate(sequelize.models)
db.Recipe_Ingredient.associate(sequelize.models)
db.Unit.associate(sequelize.models)
db.Season.associate(sequelize.models)
db.Language.associate(sequelize.models)
db.Comment.associate(sequelize.models)

db.initStatic = async ()=>{
    await db.Unit.findOrCreate({
        where: {
            full_name: "gramme",
            code: "g"
        },
        defaults: {full_name: "gramme", code: "g"}
    })
    await db.Unit.findOrCreate({
        where: {
            full_name: "mili_litter",
            code: "ml"
        },
        defaults: {
            full_name: "mili_litter",
            code: "ml"
        }
    })
    await db.Unit.findOrCreate({
        where:{
            full_name: "teaspoon",
            code: "te"
        },
        defaults: {
            full_name: "teaspoon",
            code: "te"
        }
    })
    await db.Unit.findOrCreate({
        where:{
            full_name: "tablespoon",
            code: "ta"
        },
        defaults: {
            full_name: "tablespoon",
            code: "ta"
        }
    })

    await db.Language.findOrCreate({
        where:{
            full_name: "Français",
            code: "fr_FR"
        },
        defaults: {
            full_name: 'Français',
            code: 'fr_FR'
        }
    })
    await db.Language.findOrCreate({
        where:{
            full_name: "English",
            code: "en_EN"
        },
        defaults:{
            full_name: 'English',
            code: 'en_EN'
        }
    })

    await db.Season.findOrCreate({
        where:{
            full_name: "winter",
            code: 'WI'
        },
        defaults: {
            full_name: "winter",
            code: 'WI'
        }
    })
    await db.Season.findOrCreate({
        where:{
            full_name:"spring",
            code: 'SP'
        },
        defaults: {
            full_name: "spring",
            code: 'SP'
        }
    })
    await db.Season.findOrCreate({
        where: {
            full_name: "summer",
            code: 'SU'
        },
        defaults: {
            full_name: "summer",
            code: 'SU'
        }
    })
    await db.Season.findOrCreate({
        where:{
            full_name: "fall",
            code: 'FA'
        },
        defaults: {
            full_name: "fall",
            code: 'FA'
        }
    })
    await db.Season.findOrCreate({
        where:{
            full_name: "None",
            code: 'NO'
        },
        defaults: {
            full_name: "None",
            code: 'NO'
        }
    })

    await db.Ingredient_Origin.findOrCreate({
        where:{
            name: "test" ,
            description:"azeetetst",
            image_path: "/static/images/ingredient_images/testImage.jpg",
            address:"Rue joseph boulanmerd 20 4550 belgiqaque",
            website: "https://www.thispersonedeosnotexist.com",
            phone_number: "0458987452",
            email: "test@homemadebylau.be",
            LanguageId: 1
        },
        defaults: {
            name: "test",
            description:"azeetetst",
            image_path: "/static/images/ingredient_images/testImage.jpg",
            address:"Rue joseph boulanmerd 20 4550 belgiqaque",
            website: "https://www.thispersonedeosnotexist.com",
            phone_number: "0458987452",
            email: "test@homemadebylau.be",
            LanguageId: 1
        }
    })
    await db.Ingredient_Origin.findOrCreate({
        where:{
            name: "testzaazea" ,
            description:"azeetetst",
            image_path: "/static/images/ingredient_images/testImage.jpg",
            address:"Rue joseph boulanmerd 20 4550 belgiqaque",
            website: "https://www.thispersonedeosnotexist.com",
            phone_number: "0458987452",
            email: "test@homemadebylau.be",
            LanguageId: 2
        },
        defaults: {
            name: "testzaazea" ,
            description:"azeetetst",
            image_path: "/static/images/ingredient_images/testImage.jpg",
            address:"Rue joseph boulanmerd 20 4550 belgiqaque",
            website: "https://www.thispersonedeosnotexist.com",
            phone_number: "0458987452",
            email: "test@homemadebylau.be",
            LanguageId: 2
        }

    })

    await db.Ingredient.findOrCreate({
        where:{
            name: "testsqdqs" ,
            description:"azeetetst",
            imagePath: "/static/images/ingredient_images/testImage.jpg",
            LanguageId: 1,
            SeasonId: 1,
            IngredientOriginId: 1
        },
        defaults: {
            name: "testsqdqs" ,
            description:"azeetetst",
            imagePath: "/static/images/ingredient_images/testImage.jpg",
            LanguageId: 1,
            SeasonId: 1,
            IngredientOriginId: 1
        }
    })
    await db.Ingredient.findOrCreate({
        where:{
            name: "test" ,
            description:"azeetetst",
            imagePath: "/static/images/ingredient_images/testImage.jpg",
            LanguageId: 1,
            SeasonId: 3,
            IngredientOriginId: 2
        },
        defaults: {name: "test" ,
            description:"azeetetst",
            imagePath: "/static/images/ingredient_images/testImage.jpg",
            LanguageId: 1,
            SeasonId: 3,
            IngredientOriginId: 2
        }
    })

    await  db.User.findOrCreate({
        where:{
            user_name: "louis" ,
            last_name:"louis",
            first_name: "dewilde",
            email: "test@test.com",
            right: 10
        },
        defaults: {
            user_name: "louis" ,
            last_name:"louis",
            first_name: "dewilde",
            email: "test@test.com",
            password: "test",
            right: 10
        }
    })
}

module.exports = db;