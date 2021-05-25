module.exports =(sequelize, DataTypes)=>{
    const Recipe= sequelize.define('Recipe', {

        name:{
            type :DataTypes.STRING,
            allowNull :false
        },

        description:{
            type: DataTypes.TEXT,
            allowNull : false
        },

        imageNumber:{
            type: DataTypes.NUMBER,
            allowNull :true ,
            defaultValue : 0
        },

        unfolding:{
            type: DataTypes.TEXT,
            allowNull : false
        },

        timeToPrepare: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        cookingTime: {
            type: DataTypes.NUMBER,
            allowNull: false
        }


    })
    Recipe.associate = (models) =>{
        Recipe.belongsToMany(models.Ingredient,{through: models.Recipe_Ingredient})
        Recipe.belongsToMany(models.Workshop,{through:'Recipe_Workshop'})
        Recipe.hasMany(models.Recipe_Image)
        Recipe.belongsTo(models.Language)
        Recipe.belongsTo(models.Season)
    }
    return Recipe;
};




