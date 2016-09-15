'use strict';

module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define('Todo', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      notNull: true,
      primaryKey: true
    },
    text: DataTypes.STRING,
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return Todo;
};
