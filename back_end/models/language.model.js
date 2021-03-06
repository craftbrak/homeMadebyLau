module.exports = function(sequelize, DataTypes){
    const Language= sequelize.define('Language', {

        full_name:{
            type :DataTypes.STRING,
            allowNull :false
        },

        code:{
            type: DataTypes.STRING,
            allowNull : false
        },

    },{timestamps: false})
    Language.associate = (models) =>{
        Language.hasMany(models.Ingredient)
        Language.hasMany(models.Recipe)
        Language.hasMany(models.Ingredient_Origin)


    }

    return Language
};