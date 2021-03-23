module.exports = function(sequelize, DataTypes){
    const Ingredient_Origin= sequelize.define('Ingredient_Origin', {

        name:{
            type :DataTypes.STRING,
            allowNull : false
        },

        description:{
            type: DataTypes.TEXT,
            allowNull : false
        },

        language:{
            type: DataTypes.STRING,
            allowNull :false
        },

        address: {
            type: DataTypes.STRING,
            allowNull : true
        },

        website:{
            type: DataTypes.STRING,
            allowNull : true
        },
        phone_number:{
            type: DataTypes.STRING,
            allowNull : true
        }

    })
    Ingredient_Origin.associate = (models) =>{
        Ingredient_Origin.hasMany(models.Ingredient)

    }
    return Ingredient_Origin
};