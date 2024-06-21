
import { connection } from "../../db/connection.js";

export const getAllEmployeesToWorkInSanFrancisco = async()=>{
    let [result] = await connection.query(`SELECT employees.firstName FROM employees inner join offices on offices.officeCode = employees.officeCode and offices.city = 'San Francisco'`)
    return result;
}


//7.*Obtener los nombres y direcciones de correo electrónico de los empleados que reportan al empleado con el número de empleado 1143:**
export const getEmployeesReportingTo = async (reportsTo) => {
    try {
      const query = `
        SELECT firstName, email 
        FROM employees 
        WHERE reportsTo = 1143`;
  
      const [results] = await connection.query(query, [reportsTo]);
      return results;
    } catch (error) {
      console.error("Error al obtener los empleados que reportan a este supervisor:", error);
      throw error; 
    }
  };

  //2.6 Obtener la cantidad total de empleados:**
  export const getTotalEmployees = async () => {
    try {
        const [rows] = await connection.query(`
            SELECT COUNT(*) AS totalEmployees
            FROM employees
        `);
        return rows[0].totalEmployees; // Devolver el valor directamente
    } catch (error) {
        console.error("Error al obtener el total de empleados:", error);
        throw error;
    }
};

//2.10 *Contar la cantidad de empleados por título de trabajo:**
export const getEmployeeCountByJobTitle = async () => {
    try {
        const [rows] = await connection.query(`
            SELECT jobTitle, COUNT(*) AS numberOfEmployees
            FROM employees
            GROUP BY jobTitle
        `);
        return rows;
    } catch (error) {
        console.error("Error al obtener el número de empleados por título de trabajo:", error);
        throw error;
    }
};

//3.8 FALTA ARREGLAR *Encontrar el promedio de ventas (cantidad ordenada por precio cada uno) por cada empleado:**
export const getAverageSalesByEmployee = async () => {
    try {
        const [rows] = await connection.query(`
        SELECT e.employeeNumber, e.firstName, e.lastName, AVG(total_sales) AS avg_sales 
        FROM (
          SELECT e.employeeNumber, e.firstName, e.lastName, o.orderNumber, SUM(od.quantityOrdered * od.priceEach) AS total_sales
          FROM employees e
          JOIN customers c ON e.employeeNumber = c.salesRepEmployeeNumber
          JOIN orders o ON c.customerNumber = o.customerNumber
          JOIN orderdetails od ON o.orderNumber = od.orderNumber
          WHERE o.status = 'Shipped'
          GROUP BY e.employeeNumber, e.firstName, e.lastName, o.orderNumber
        ) AS employee_sales
        GROUP BY employeeNumber, firstName, lastName;
        `);
        return rows;
    } catch (error) {
        console.error("Error al obtener el promedio de ventas por empleado:", error);
        throw error;
    }
};

//3.9 *Calcular el total de órdenes gestionadas por cada empleado:**
export const getTotalOrdersManagedByEmployee = async () => {
    try {
        const [rows] = await connection.query(`
            SELECT e.employeeNumber, e.firstName, e.lastName, COUNT(o.orderNumber) AS totalOrders
            FROM employees e
            JOIN customers c ON e.employeeNumber = c.salesRepEmployeeNumber
            JOIN orders o ON c.customerNumber = o.customerNumber
            WHERE o.status = 'Shipped'
            GROUP BY e.employeeNumber, e.firstName, e.lastName
        `);
        return rows;
    } catch (error) {
        console.error("Error al obtener el total de órdenes gestionadas por empleado:", error);
        throw error;
    }
};

//3.14 *Encontrar la cantidad total de productos vendidos por cada vendedor:**
export const getTotalProductsSoldByEmployee = async () => {
    try {
        const [rows] = await connection.query(`
            SELECT e.employeeNumber, e.firstName, e.lastName, SUM(od.quantityOrdered) AS totalProductsSold
            FROM employees e
            JOIN customers c ON e.employeeNumber = c.salesRepEmployeeNumber
            JOIN orders o ON c.customerNumber = o.customerNumber
            JOIN orderdetails od ON o.orderNumber = od.orderNumber
            WHERE o.status = 'Shipped'
            GROUP BY e.employeeNumber, e.firstName, e.lastName
        `);
        return rows;
    } catch (error) {
        console.error("Error al obtener la cantidad total de productos vendidos por empleado:", error);
        throw error;
    }
};

//3.15 *Calcular el total de pagos recibidos por cada vendedor:**
export const getTotalPaymentsByEmployee = async () => {
    try {
        const [rows] = await connection.query(`
            SELECT e.employeeNumber, e.firstName, e.lastName, SUM(p.amount) AS totalPayments
            FROM employees e
            JOIN customers c ON e.employeeNumber = c.salesRepEmployeeNumber
            JOIN payments p ON c.customerNumber = p.customerNumber
            GROUP BY e.employeeNumber, e.firstName, e.lastName
        `);
        return rows;
    } catch (error) {
        console.error("Error al obtener el total de pagos por vendedor:", error);
        throw error;
    }
};

//3.16 *Obtener el promedio del límite de crédito de los clientes atendidos por cada vendedor:**