module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Posts',
                key: 'id'
            },  
        },
    }, {
        timestamps: true
    });

    Book.associate = (models) => {
        Book.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
        Book.belongsTo(models.Post, { foreignKey: 'postId', as: 'Post' });
    };

    return Book;
};