
import { connection } from "../../db/connection.js";

export const getAllProductsDescription = async()=>{
    let [result] = await connection.query(`SELECT productLine, productDescription FROM products`);
    return result;
}

export const getAllEmployeesToWorkInSanFrancisco = async()=>{
    let [result] = await connection.query(`SELECT employees.firstName FROM employees inner join offices on offices.officeCode = employees.officeCode and offices.city = 'San Francisco'`)
    return result;
}