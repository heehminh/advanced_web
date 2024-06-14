module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
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
        }
         } 
    });

    Like.associate = (models) => {
        Like.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
        Like.belongsTo(models.Post, { foreignKey: 'postId', as: 'Post' });
    };

    return Like;
};