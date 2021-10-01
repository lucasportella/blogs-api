module.exports = (sequelize, DataTypes) => {
    const Categorie = sequelize.define('Category', {
        name: DataTypes.STRING,
    }, { timestamps: false });
    return Categorie;
};