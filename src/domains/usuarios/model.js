import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const User = sequelize.define('User', {
    nome: { allowNull: false, type: DataTypes.STRING },
    email: { allowNull: false, type: DataTypes.STRING, unique: true },
    password: { allowNull: false, type: DataTypes.STRING },
    mensalidadePaga: { allowNull: false, type: DataTypes.BOOLEAN, defaultValue: false }
})
export default User