'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payment_request', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      request_uid: {
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
      expected_value: {
        type: DataTypes.BIGINT,
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
        type: DataTypes.ENUM([
          'pending',
          'processing',
          'partially_paid',
          'paid',
          'expired',
          'expired_partially_paid',
        ]),
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

    await queryInterface.addIndex('payment_request', ['request_uid'], {
      name: 'uq_payment_request_uid',
      unique: true,
    });

    await queryInterface.addIndex('payment_request', ['customer_id', 'network'], {
      name: 'idx_payment_request_customer_network',
      unique: false,
    });

    await queryInterface.addIndex('payment_request', ['customer_id', 'network', 'status'], {
      name: 'idx_payment_request_customer_network_status',
      unique: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payment_request');
    await queryInterface.removeIndex('payment_request', 'uq_payment_request_uid');
    await queryInterface.removeIndex('payment_request', 'idx_payment_request_customer_network');
    await queryInterface.removeIndex(
      'payment_request',
      'idx_payment_request_customer_network_status',
    );
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_payment_request_network";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_payment_request_currency";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_payment_request_status";');
  },
};
