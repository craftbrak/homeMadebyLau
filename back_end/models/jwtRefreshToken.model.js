module.exports = function(sequelize, DataTypes){
    const RefreshToken= sequelize.define('RefreshToken', {

        token:{
            type :DataTypes.STRING,
            allowNull :false
        }

    },{timestamps: false})
    RefreshToken.associate = (models) =>{

    }

    return RefreshToken
};