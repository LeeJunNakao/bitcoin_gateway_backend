'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customer_api_key', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      uid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'customer',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      api_key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addIndex('customer_api_key', ['customer_id'], {
      name: 'idx_customer_api_key_customer_id',
      unique: false,
    });

    await queryInterface.addIndex('customer_api_key', ['customer_id', 'api_key'], {
      name: 'idx_customer_api_key_customer_apikey',
      unique: true,
    });

    await queryInterface.addIndex('customer_api_key', ['customer_id', 'name'], {
      name: 'idx_customer_api_key_customer_name',
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('customer_api_key');
    await queryInterface.removeIndex('customer_api_key', 'idx_customer_api_key_customer_id');
    await queryInterface.removeIndex('customer_api_key', 'idx_customer_api_key_customer_apikey');
    await queryInterface.removeIndex('customer_api_key', 'idx_customer_api_key_customer_name');
  },
};
