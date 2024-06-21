
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