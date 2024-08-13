"use strict";

module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define(
        "Note",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
            },
            body: {
                type: DataTypes.STRING,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: "Note",
        }
    );
    return Note;
};
