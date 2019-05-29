'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('shops', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      thumb_url: Sequelize.STRING,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    })
  ),

  down: (queryInterface) => (
    queryInterface.dropTable('shop')
  )
};
