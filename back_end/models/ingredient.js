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

        language:{
            type: DataTypes.STRING,
            allowNull :false
        },

        season: {
            type: DataTypes.STRING,
            allowNull :false
        },

        origin:{
            type: DataTypes.TEXT,
            allowNull : false
        },
        image :{
            type: DataTypes.STRING.BINARY,
            allowNull : true
        }

    })
    Ingredient.associate = (models) =>{
        Ingredient.belongsToMany(models.Recipe ,{through: 'Recipe_Ingredients'})
        Ingredient.belongsTo(models.Ingredient_Origin)

    }
    return Ingredient
};
