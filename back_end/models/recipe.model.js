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

        language:{
            type: DataTypes.STRING,
            allowNull :false
        },

        imageNumber:{
            type: DataTypes.NUMBER,
            allowNull :true ,
            defaultValue : 0
        },

        season: {
            type: DataTypes.STRING,
            allowNull :false
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
        Recipe.hasMany(models.Ingredient,)
        Recipe.hasMany(models.Recipe_Image)
    }
    return Recipe;
};




