module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING,
    sessionToken: {
      type: DataTypes.UUID,
      validate: {        
        isUUID: 4
      }
    }
  });

  return User;
};
