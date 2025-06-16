'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payment_request_processing_queue', {
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
        type: DataTypes.ENUM(['pending', 'paid']),
        allowNull: false,
      },
      transaction_hash: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addIndex('payment_request_processing_queue', ['status'], {
      name: 'uq_payment_request_processing_queue_status',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payment_request_processing_queue');
    await queryInterface.removeIndex(
      'payment_request_processing_queue',
      'uq_payment_request_processing_queue_status',
    );

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_payment_request_processing_queue_network";',
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_payment_request_processing_queue_currency";',
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_payment_request_processing_queue_status";',
    );
  },
};
