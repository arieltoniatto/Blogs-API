const SchemaBlogPost = (sequelize, DataTypes) => {
    const BlogPostTable = sequelize.define('BlogPost', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        user_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
        published: DataTypes.INTEGER,
        updated: DataTypes.INTEGER,
    },
    {
        createdAt: 'published',
        updatedAt: 'updated',
        tableName: 'BlogPost',
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