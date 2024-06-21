import { connection } from "../../db/connection.js";

export const getAverageQuantityOrderedByProduct = async () => {
    try {
        const [rows] = await connection.query(`
            SELECT productCode, AVG(quantityOrdered) AS averageQuantityOrdered
            FROM orderdetails
            GROUP BY productCode
        `);
        return rows;
    } catch (error) {
        console.error("Error al obtener la cantidad media de productos pedidos por producto:", error);
        throw error;
    }
};