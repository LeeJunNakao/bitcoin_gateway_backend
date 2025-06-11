'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('request_entry', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      request_uid: {
        type: DataTypes.STRING,
        allowNull: false,
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
      expected_value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      network: {
        type: DataTypes.ENUM(['bitcoin']),
        allowNull: false,
      },
      currency: {
        type: DataTypes.ENUM(['bitcoin']),
        allowNull: false,
      },
      network_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(['pending', 'paid']),
        allowNull: false,
      },
      transaction_hash: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
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

    await queryInterface.addIndex('request_entry', ['request_uid'], {
      name: 'uq_request_entry_uid',
      unique: true,
    });

    await queryInterface.addIndex('request_entry', ['customer_id', 'network'], {
      name: 'idx_request_entry_customer_network',
      unique: false,
    });

    await queryInterface.addIndex('request_entry', ['customer_id', 'network', 'status'], {
      name: 'idx_request_entry_customer_network_status',
      unique: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('request_entry');
    await queryInterface.removeIndex('request_entry', 'uq_request_entry_uid');
    await queryInterface.removeIndex('request_entry', 'idx_request_entry_customer_network');
    await queryInterface.removeIndex('request_entry', 'idx_request_entry_customer_network_status');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_request_entry_network";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_request_entry_currency";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_request_entry_status";');
  },
};
