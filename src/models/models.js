import { DataTypes } from "sequelize";
import sequelize from "../db.js";

export const User = sequelize.define('users', {
    nome: { allowNull: false, type: DataTypes.STRING },
    email: { allowNull: false, type: DataTypes.STRING, unique: true },
    password: { allowNull: false, type: DataTypes.STRING },
    mensalidadePaga: { allowNull: false, type: DataTypes.BOOLEAN, defaultValue: false }
})

export const Prof = sequelize.define('professores', {
    nome: { allowNull: false, type: DataTypes.STRING },
    email: { allowNull: false, type: DataTypes.STRING, unique: true },
    password: { allowNull: false, type: DataTypes.STRING }
})

export const Materia = sequelize.define('materias', {
    nome: { allowNull: false, type: DataTypes.STRING },
})
User.belongsToMany(Materia, {
    through: 'users_materias',
});

Materia.belongsToMany(User, {
    through: 'users_materias',
});

export default { User, Prof }