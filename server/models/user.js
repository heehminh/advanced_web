module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        kakaoId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        provider: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'local',
        },
    }, {
        timestamps: true
    }
);

    User.associate = (models) => {
        User.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' });
    };

    return User;
};
