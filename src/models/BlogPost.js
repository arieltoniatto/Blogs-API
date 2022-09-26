const SchemaBlogPost = (sequelize, DataTypes) => {
    const BlogPostTable = sequelize.define('BlogPost', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        userId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
        published: DataTypes.DATE,
        updated: DataTypes.DATE,
    },
    {
        createdAt: 'published',
        updatedAt: 'updated',
        tableName: 'blog_posts',
        underscored: true,
    });

    BlogPostTable.associate = (models) => {
        BlogPostTable.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        });
    };

    return BlogPostTable
};

module.exports = SchemaBlogPost;