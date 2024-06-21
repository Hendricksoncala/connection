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

//3.4 *Encontrar la cantidad total de productos pedidos por cada cliente:**

export const getTotalProductsOrderedByCustomer = async () => {
    try {
        const [rows] = await connection.query(`
            SELECT c.customerName, o.orderNumber, SUM(od.quantityOrdered) AS totalQuantityOrdered
            FROM orderdetails od
            JOIN orders o ON od.orderNumber = o.orderNumber
            JOIN customers c ON o.customerNumber = c.customerNumber
            GROUP BY c.customerName, o.orderNumber
        `);
        return rows;
    } catch (error) {
        console.error("Error al obtener la cantidad total de productos pedidos por cliente:", error);
        throw error;
    }
};