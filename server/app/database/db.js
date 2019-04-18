/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2019-01-25
 * Description:
 统一主键，名称是 id，类型是 UUID；
 所有字段默认为 NULL，除非显式指定；
 统一 timestamp 机制，每个 Model 必须有 createdAt、updatedAt 和 version，分别记录创建时间、修改时间和版本号。

 */
const uuidv1 = require("uuid/v1");

function generateUUID() {
    return uuidv1().replace(/-/g, "");
}

function defineModel(app, name, attributes) {
    const { UUID } = app.Sequelize;

    let attrs = {};
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === "object" && value["type"]) {
            value.allowNull = value.allowNull && false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: true
            };
        }
    }

    attrs.id = {
        type: UUID,
        primaryKey: true,
        defaultValue: () => {
            return generateUUID();
        }
    };

    return app.model.define(name, attrs, {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        version: true,
        freezeTableName: true //Model 对应的表名将与model名相同,不会变为复数
    });
}

module.exports = { defineModel };
