const SchemaCategory = (sequelize, DataTypes) => {
    const CategoriesTable = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: DataTypes.STRING,
    },
    {
        timestamps: false,
        tableName: 'categories',
    });

    return CategoriesTable;
}

module.exports = SchemaCategory