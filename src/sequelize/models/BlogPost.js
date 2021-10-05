module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        userId: { type: DataTypes.INTEGER, foreignKey: true },
        published: DataTypes.DATE,
        updated: DataTypes.DATE,
    }, { timestamps: false });
    // acredito que como estamos usando como timestamp as propridades published e updated no lugar de createdAt e updatedAt, precisamos desativar os timestamps, caso contrário o sequelize fica procurando o createdAt e updatedAt e dá erro

    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User, {
            foreignKey: 'userId', as: 'user',
        });
    };
    return BlogPost;
};