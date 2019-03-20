'use strict';
const moment = require('moment');

module.exports = app => {
  const { INTEGER, DATE, DECIMAL, STRING, ENUM } = app.Sequelize;
  const Qrcodes = app.model.define('yio_qrcodes', {
    id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
    qr_type: { type: ENUM('wechat', 'alipay'), defaultValue: 'wechat' },
    qr_url: { type: STRING(255), allowNull: false },
    qr_price: { type: DECIMAL(4, 2), allowNull: false },
    created_at: { type: DATE, allowNull: false, get() { return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss'); } },
    updated_at: { type: DATE, allowNull: false, get() { return moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss'); } },
  }, {
    paranoid: true,
    timestamps: true,
  });

  return Qrcodes;
};
