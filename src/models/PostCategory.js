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
        tableName: 'post_categories',
        underscored: true,
    });

    PostCategoryTable.associate = (models) => {
        models.Category.belongsToMany(models.BlogPost, {
            as: 'posts',
            through: PostCategoryTable,
            foreignKey: 'postId',
            otherKey: 'categoryId',
        });

        models.BlogPost.belongsToMany(models.Category, {
            as: 'categories',
            through: PostCategoryTable,
            foreignKey: 'categoryId',
            otherKey: 'postId',
        });
    }

    return PostCategoryTable;
};

module.exports = SchemaPostCategory;