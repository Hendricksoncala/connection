
import { connection } from "../../db/connection.js";

export const getAllProductsDescription = async()=>{
    let [result] = await connection.query(`SELECT productLine, productDescription FROM products`);
    return result;
}

export const getAllEmployeesToWorkInSanFrancisco = async()=>{
    let [result] = await connection.query(`SELECT employees.firstName FROM employees inner join offices on offices.officeCode = employees.officeCode and offices.city = 'San Francisco'`)
    return result;
}

export const getAllShippedOrders = async () => {
    const query = "SELECT orderNumber, status FROM orders WHERE status = 'Shipped'";
    const [results] = await connection.query(query);
    return results;
  };

//Obtener los detalles de todos los pagos realizados por el cliente con el número de cliente 103:**
  export const getAllPaymentsByCustomer = async (customerNumber) => {
    try {
        const [results] = await connection.query(
            "SELECT * FROM payments WHERE customerNumber = ?",
            [customerNumber] // Parámetro para evitar inyección SQL
        );
        return results; // Devuelve los resultados de la consulta
    } catch (error) {
        console.error("Error al obtener los pagos del cliente:", error);
        throw error; // Relanza el error para manejarlo en otro lugar si es necesario
    }
};

//*Recuperar todos los clientes de 'USA' que tienen un límite de crédito superior a 50000:**
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

//Listar todos los productos junto con las descripciones de sus líneas de productos:**
export const getAllProductsWithLineDescriptions = async () => {
    try {
      const query = `
        SELECT p.productName, p.productDescription, pl.textDescription AS productLineDescription
        FROM products p
        JOIN productlines pl ON p.productLine = pl.productLine
      `;
      const [results] = await connection.query(query);
      return results;
    } catch (error) {
      console.error("Error al obtener los productos con descripciones de línea:", error);
      throw error; // Relanza el error para manejarlo en otro lugar si es necesario
    }
  };

//*Obtener los nombres y direcciones de correo electrónico de los empleados que reportan al empleado con el número de empleado 1143:**
export const getEmployeesReportingTo = async (reportsTo) => {
    try {
      const query = `
        SELECT firstName, email 
        FROM employees 
        WHERE reportsTo = ?`;
  
      const [results] = await connection.query(query, [reportsTo]);
      return results;
    } catch (error) {
      console.error("Error al obtener los empleados que reportan a este supervisor:", error);
      throw error; 
    }
  };

//*Encontrar todas las órdenes realizadas por clientes de 'Francia':**
