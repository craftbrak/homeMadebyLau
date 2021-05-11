const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes){
    const User= sequelize.define('User', {
        user_name :{
          type :DataTypes.STRING,
          allowNull :false
        },
        last_name:{
            type :DataTypes.STRING,
            allowNull :false
        },

        first_name:{
            type: DataTypes.STRING,
            allowNull : false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique : true
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            set (value) {
                try {
                    const hash= bcrypt.hashSync(value,this.salt)
                    this.setDataValue('password', hash);
                } catch (err) {
                    if (err) throw err
                }

            }
        },
        salt: {
            type: DataTypes.STRING,
            allowNull:false,
            defaultValue: () =>{
                return bcrypt.genSaltSync(13)  ;
            }
        },
        right : {
            type: DataTypes.NUMBER,
            allowNull: false,
            defaultValue : 0
        }



    },{timestamps: true})
    User.associate = (models) =>{
        // User.hasMany(models.Comments)

    }

    return User
};
