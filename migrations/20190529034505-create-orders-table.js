'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'orders',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      payment_status: {
        type: Sequelize.ENUM('0', '1'),  // 0 未支付， 1 已支付
        defaultValue: '0',
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    }
  ),

  down: queryInterface => queryInterface.dropTable('orders'),
};
