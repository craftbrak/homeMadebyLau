module.exports = function(sequelize, DataTypes){
    const Ingredient= sequelize.define('Ingredient', {

        name:{
            type :DataTypes.STRING,
            allowNull :false
        },

        description:{
            type: DataTypes.TEXT,
            allowNull : false
        },

        imagePath :{
            type: DataTypes.STRING,
            allowNull : true
        }

    })
    Ingredient.associate = (models) =>{
        Ingredient.belongsToMany(models.Recipe ,{through: models.Recipe_Ingredient})
        Ingredient.belongsTo(models.Ingredient_Origin)
        Ingredient.belongsTo(models.Language)
        Ingredient.belongsTo(models.Season)
    }
    return Ingredient
};
