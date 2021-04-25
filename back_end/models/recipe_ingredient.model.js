module.exports = function(sequelize, DataTypes){
    const Recipe_Ingredient= sequelize.define('Recipe_Ingredient', {
        quantity:{
            type: DataTypes.NUMBER,
            allowNull :false
        },

    })
    Recipe_Ingredient.associate = (models) =>{
        Recipe_Ingredient.belongsTo(models.Unit)
    }
    return Recipe_Ingredient
};