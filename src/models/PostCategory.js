const SchemaPostCategory = (sequelize, DataTypes) => {
    const PostCategoryTable = sequelize.define('PostCategory', {
        postId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            foreignKey: true,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            foreignKey: true,
        },
    },
    {
        timestamps: false,
        tableName: 'posts_categories',
        underscored: true,
    });

    PostCategoryTable.associate = (models) => {
        models.Category.belongsToMany(models.BlogPost, {
            as: 'blog_posts',
            through: PostCategoryTable,
            foreignKey: 'categoryId',
            otherKey: 'postId',
        });

        models.BlogPost.belongsToMany(models.Category, {
            as: 'categories',
            through: PostCategoryTable,
            foreignKey: 'postId',
            otherKey: 'categoryId',
        });
    }

    return PostCategoryTable;
};

module.exports = SchemaPostCategory;