import { connection } from "../../db/connection.js";

export const getAllShippedOrders = async () => {
    const query = "SELECT orderNumber, status FROM orders WHERE status = 'Shipped'";
    const [results] = await connection.query(query);
    return results;
  };

//8.*Encontrar todas las órdenes realizadas por clientes de 'Francia':**
export const getAllOrdersFromFrance = async () => {
    try {
        const [rows] = await connection.query(`
            SELECT o.orderNumber, o.orderDate, c.customerName 
            FROM orders o
            JOIN customers c ON o.customerNumber = c.customerNumber
            WHERE c.country = 'France'
        `);
        return rows;
    } catch (error) {
        console.error("Error al obtener las órdenes de Francia:", error);
        throw error;
    }
  };

//3.3 *Calcular el total de órdenes realizadas por cada cliente:**
export const getTotalOrdersByCustomer = async () => {
    try {
        const [rows] = await connection.query(`
            SELECT o.customerNumber, c.customerName, COUNT(o.orderNumber) AS totalOrders
            FROM orders o
            JOIN customers c ON o.customerNumber = c.customerNumber
            GROUP BY o.customerNumber
        `);
        return rows;
    } catch (error) {
        console.error("Error al obtener el total de órdenes por cliente:", error);
        throw error;
    }
};