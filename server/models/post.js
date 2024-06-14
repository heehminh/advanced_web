module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lat: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        lng: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        like: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        photos: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },  
    }, {
        timestamps: true
    });

    Post.associate = (models) => {
        Post.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
        Post.hasMany(models.Like, { foreignKey: 'postId', as: 'Likes' });
    };

    return Post;
};
