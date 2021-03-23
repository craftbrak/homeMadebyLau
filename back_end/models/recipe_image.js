module.exports = function(sequelize, DataTypes){
    const Recipe_Image= sequelize.define('Recipe_Image', {
        img :{
            type: DataTypes.STRING.BINARY,
            allowNull : false
        },
        caption:{
            type: DataTypes.STRING,
            allowNull: true
        }
    })
    Recipe_Image.associate= (models) =>{
        Recipe_Image.belongsTo(models.Recipe)

    }
    return Recipe_Image
};
