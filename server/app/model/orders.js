'use strict';
const moment = require('moment');

module.exports = app => {
  const { INTEGER, DATE, DECIMAL, STRING, ENUM } = app.Sequelize;
  const Orders = app.model.define('yio_orders', {
    id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
    order_id: { type: STRING(50), allowNull: false },
    order_type: { type: ENUM('wechat', 'alipay'), defaultValue: 'wechat', allowNull: false },
    order_price: { type: DECIMAL(7, 2), allowNull: false },
    order_name: { type: STRING(255), allowNull: false },
    pay_status: { type: ENUM('未支付', '已支付', '已过期'), defaultValue: '未支付', allowNull: false },
    qr_url: { type: STRING(255), allowNull: false },
    qr_price: { type: DECIMAL(7, 2), allowNull: false },
    redirect_url: { type: STRING(255), allowNull: false },
    extension: { type: STRING(255) },
    created_at: { type: DATE, allowNull: false, get() { return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss'); } },
    updated_at: { type: DATE, allowNull: false, get() { return moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss'); } },
  }, {
    paranoid: true,
    timestamps: true,
  });

  return Orders;
};
