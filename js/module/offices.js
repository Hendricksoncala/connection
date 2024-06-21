
import { connection } from "../../db/connection.js";

export const getOfficeCountByCountry = async () => {
    try {
        const [rows] = await connection.query(`
            SELECT country, COUNT(officeCode) AS numberOfOffices
            FROM offices
            GROUP BY country
        `);
        return rows;
    } catch (error) {
        console.error("Error al obtener el número de oficinas por país:", error);
        throw error;
    }
};