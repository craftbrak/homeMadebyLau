module.exports = function(sequelize, DataTypes){
    const Recipe_Ingredient= sequelize.define('Recipe_Ingredient', {
        quantity:{
            type: DataTypes.NUMBER,
            allowNull :false
        },

        Unit: {
            type: DataTypes.STRING,
            allowNull :false
        }

    })
    Recipe_Ingredient.associate = (models) =>{
        Recipe_Ingredient.hasOne(models.Recipe)
        Recipe_Ingredient.hasOne(models.Ingredient)

    }
    return Recipe_Ingredient
};