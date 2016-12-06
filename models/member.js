"use strict";

module.exports = function (sequelize, DataTypes) {
    var Member = sequelize.define('Member', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(32),
            allowNull: false
        }
    }, {
            // 默认会生成updatedAt, createdAt两个属性，false禁止
            timestamps: false,
            // 默认会对表名称添加复数，true为禁止
            freezeTableName: true
        });
    return Member;
};