module.exports = function(sequelize, DataTypes){
    const Workshop= sequelize.define('Workshop', {

        title :{
        type: DataTypes.NUMBER,
            allowNull: false
        },
        date:{
            type: DataTypes.DATE,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        link: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        subscribeBefore: {
            type: DataTypes.DATE,
            allowNull: false
        },
        available: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        },
        maxSubscription: {
            type: DataTypes.NUMBER,
            allowNull: false
        }

    })
    Workshop.associate = (models) =>{
        Workshop.belongsToMany(models.Recipe, {through: 'Recipe_Workshop',as :"Recipe"})
        Workshop.belongsToMany(models.User,{through: models.User_Workshop, as: 'subscribed'})
        Workshop.belongsTo(models.Language)
    }
    return Workshop
}
