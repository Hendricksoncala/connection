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

//3.1 *Calcular el total de pagos recibidos por cada cliente:
export const getTotalPaymentsByTheCustomer = async () => {
    try {
        const [rows] = await connection.query(`
            SELECT c.customerName, SUM(p.amount) AS totalPayments
            FROM customers c
            JOIN payments p ON c.customerNumber = p.customerNumber
            GROUP BY c.customerNumber
        `);
        return rows;
    } catch (error) {
        console.error("Error al obtener los pagos totales por cliente:", error);
        throw error;
    }
};

//3.2 *Obtener el promedio del límite de crédito de los clientes por país:**
export const getAverageCreditLimitByCountry = async () => {
    try {
        const [rows] = await connection.query(`
            SELECT country, AVG(creditLimit) AS averageCreditLimit
            FROM customers
            GROUP BY country
        `);
        return rows;
    } catch (error) {
        console.error("Error al obtener el promedio del límite de crédito por país:", error);
        throw error;
    }
};

//3.5 *Calcular el total de ventas (cantidad ordenada por precio cada uno) por cada cliente:**
export const getTotalSalesByCustomer = async () => {
    try {
        const [rows] = await connection.query(`
            SELECT c.customerName, SUM(od.quantityOrdered * od.priceEach) AS totalSales
            FROM customers c
            JOIN orders o ON c.customerNumber = o.customerNumber
            JOIN orderdetails od ON o.orderNumber = od.orderNumber
            GROUP BY c.customerName
        `);
        return rows;
    } catch (error) {
        console.error("Error al obtener el total de ventas por cliente:", error);
        throw error;
    }
};

//3.7 *Calcular el total de pagos recibidos por cada país:**
export const getTotalPaymentsByCountry = async () => {
    try {
        const [rows] = await connection.query(`
            SELECT c.country, SUM(p.amount) AS totalPayments
            FROM customers c
            JOIN payments p ON c.customerNumber = p.customerNumber
            GROUP BY c.country
        `);
        return rows;
    } catch (error) {
        console.error("Error al obtener los pagos totales por país:", error);
        throw error;
    }
};

//3.11 *Encontrar el promedio de la cantidad de productos ordenados por cada cliente:**
export const getAverageQuantityOrderedByCustomer = async () => {
    try {
        const [rows] = await connection.query(`
            SELECT c.customerNumber, c.customerName, AVG(od.quantityOrdered) AS averageQuantityOrdered
            FROM customers c
            JOIN orders o ON c.customerNumber = o.customerNumber
            JOIN orderdetails od ON o.orderNumber = od.orderNumber
            GROUP BY c.customerNumber, c.customerName
        `);
        return rows;
    } catch (error) {
        console.error("Error al obtener el promedio de cantidad de productos ordenados por cliente:", error);
        throw error;
    }
};

//3.12 *Calcular el total de ventas realizadas en cada país:**
export const getTotalSalesByCountry = async () => {
    try {
        const [rows] = await connection.query(`
            SELECT c.country, SUM(od.quantityOrdered * od.priceEach) AS totalSales
            FROM customers c
            JOIN orders o ON c.customerNumber = o.customerNumber
            JOIN orderdetails od ON o.orderNumber = od.orderNumber
            WHERE o.status = 'Shipped'
            GROUP BY c.country
        `);
        return rows;
    } catch (error) {
        console.error("Error al obtener el total de ventas por país:", error);
        throw error;
    }
};

//3.18  *Calcular la cantidad media de productos pedidos por cada cliente:**
