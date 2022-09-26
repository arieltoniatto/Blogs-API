const SchemaUser = (sequelize, DataTypes) => {
    const UserTable = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        displayName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING,
    },
    {
        timestamps: false,
        tableName: 'users',
        underscored: true,
    });

    UserTable.associate = (models) => {
        UserTable.hasMany(models.BlogPost, {
            foreignKey: 'id',
            as: 'BlogPosts',
        });
    };

    return UserTable;
}

module.exports = SchemaUser;