module.exports = function(sequelize, DataTypes){
    const User_Workshop= sequelize.define('User_Workshop', {
        validated:{
            type: DataTypes.BOOLEAN,
            allowNull :false
        },

    })
    User_Workshop.associate = (models) =>{
        User_Workshop.belongsTo(models.Unit)
    }
    return User_Workshop
};