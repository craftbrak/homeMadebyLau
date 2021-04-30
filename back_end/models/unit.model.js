module.exports = function(sequelize, DataTypes){
    const Unit= sequelize.define('Unit', {

        full_name:{
            type :DataTypes.STRING,
            allowNull :false
        },

        code:{
            type: DataTypes.STRING,
            allowNull : false
        },



    },{timestamps: false})
    Unit.associate = (models) =>{
        Unit.hasMany(models.Recipe_Ingredient)

    }

    return Unit
};
