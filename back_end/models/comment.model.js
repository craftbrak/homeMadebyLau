module.exports = function(sequelize, DataTypes){
    const Comment= sequelize.define('Comment', {

        text:{
            type :DataTypes.STRING,
            allowNull :false
        },
        signaled:{
            type :DataTypes.STRING,
            allowNull: false
        }
    })
    Comment.associate = (models) =>{
        Comment.belongsToMany(models.Comment ,{through: 'comments_responses',foreignKey: 'responseId', otherKey: 'responsingId', as : 'answering'})
        Comment.belongsToMany(models.Comment ,{through: 'comments_responses',foreignKey: 'responsingId', otherKey: 'responseId', as : 'answer'})
        Comment.belongsTo(models.User)
        Comment.belongsTo(models.Recipe)
    }
    return Comment
}
