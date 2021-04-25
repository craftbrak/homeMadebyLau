module.exports = function(sequelize, DataTypes){
    const Season= sequelize.define('Season', {

        full_name:{
            type :DataTypes.STRING,
            allowNull :false
        },

        code:{
            type: DataTypes.STRING,
            allowNull : false
        },


    },{timestamps: false})
    Season.associate = (models) =>{
        Season.hasMany(models.Ingredient)

    }
    return Season
};