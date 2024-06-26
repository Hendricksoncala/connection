
import { connection } from "../../db/connection.js";

//4.Obtener los detalles de todos los pagos realizados por el cliente con el número de cliente 103:**
export const getAllPaymentsByCustomer = async (customerNumber) => {
    try {
        const [results] = await connection.query(
            "SELECT * FROM payments WHERE customerNumber = 103",
            [customerNumber] // Parámetro para evitar inyección SQL
        );
        return results; // Devuelve los resultados de la consulta
    } catch (error) {
        console.error("Error al obtener los pagos del cliente:", error);
        throw error; // Relanza el error para manejarlo en otro lugar si es necesario
    }
};

//9.*Listar el monto total de los pagos recibidos de cada cliente:**
export const getTotalPaymentsByCustomer = async () => {
    try {
        const [rows] = await connection.query(`
            SELECT customerNumber, SUM(amount) AS totalPayments
            FROM payments
            GROUP BY customerNumber
        `);
        return rows;
    } catch (error) {
        console.error("Error al obtener los pagos totales por cliente:", error);
        throw error;
    }
  };
  
//2.5 *Calcular el total de pagos recibidos:**
  export const getTotalPayments = async () => {
    try {
        const [rows] = await connection.query(`
            SELECT FORMAT(SUM(amount), 2) AS totalPayments
            FROM payments
        `);
        return rows[0].totalPayments; // Devolver el valor formateado directamente
    } catch (error) {
        console.error("Error al obtener el total de pagos:", error);
        throw error;
    }
};

//3.19 *Obtener el total de pagos realizados en cada año:**
