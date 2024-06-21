import { connection } from "../../db/connection.js";




//5.*Recuperar todos los clientes de 'USA' que tienen un límite de crédito superior a 50000:**
export const getCustomersFromUSAWithHighCreditLimit = async () => {
    try {
      const query = "SELECT * FROM customers WHERE country = 'USA' AND creditLimit > 50000";
      const [results] = await connection.query(query);
      return results;
    } catch (error) {
      console.error("Error al obtener los clientes de USA con alto límite de crédito:", error);
      throw error;
    }
  };


  //10.*Recuperar los detalles de las órdenes, incluyendo los nombres de los productos, para todas las órdenes realizadas por el cliente con el número de cliente 101:** 
export const getOrderDetailsByCustomer = async (customerNumber) => {
    try {
        const [rows] = await connection.query(`
            SELECT c.customerName, o.orderDate, od.productCode, od.quantityOrdered, od.priceEach
            FROM customers c
            INNER JOIN orders o ON c.customerNumber = o.customerNumber
            INNER JOIN orderdetails od ON o.orderNumber = od.orderNumber
            WHERE c.customerNumber = ?
        `, [customerNumber]);
        return rows;
    } catch (error) {
        console.error("Error al obtener los detalles de las órdenes del cliente:", error);
        throw error;
    }
  };

//2.1 *Obtener el promedio del límite de crédito de todos los clientes:**
export const getAverageCreditLimit = async () => {
    try {
        const [rows] = await connection.query(`
            SELECT customerNumber, customerName, AVG(creditLimit) AS averageCreditLimit
            FROM customers
            GROUP BY customerNumber, customerName
        `);
        return rows;
    } catch (error) {
        console.error("Error al obtener el promedio del límite de crédito:", error);
        throw error;
    }
};