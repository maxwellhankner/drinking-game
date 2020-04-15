module.exports = function(sequelize, DataTypes) {
    const Prompt = sequelize.define("Prompt", {
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        answer: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });
    return Prompt;
};