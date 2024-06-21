
import { connection } from "../../db/connection.js";

export const getAllProductsDescription = async()=>{
    let [result] = await connection.query(`SELECT productLine, productDescription FROM products`);
    return result;
};



//6.Listar todos los productos junto con las descripciones de sus líneas de productos:**
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

//2.2 *Calcular el total de productos en stock:**
export const getProductStockByLine = async () => {
  try {
      const [rows] = await connection.query(`
          SELECT productLine, COUNT(*) AS totalProducts
          FROM products
          GROUP BY productLine
      `);
      return rows;
  } catch (error) {
      console.error("Error al obtener el stock de productos por línea:", error);
      throw error;
  }
};

//2.3*Encontrar el precio medio de compra de todos los productos:**
export const getAverageBuyPriceByProduct = async () => {
  try {
      const [rows] = await connection.query(`
          SELECT productName, AVG(buyPrice) AS averageBuyPrice
          FROM products
          GROUP BY productName
          ORDER BY averageBuyPrice DESC
      `);
      return rows;
  } catch (error) {
      console.error("Error al obtener el precio medio de compra por producto:", error);
      throw error;
  }
};

//2.8 *Encontrar el precio total de todos los productos:**
export const getTotalProductPrice = async () => {
  try {
      const [rows] = await connection.query(`
          SELECT SUM(buyPrice) AS totalPrice
          FROM products
      `);
      return rows[0].totalPrice; // Devolver el valor directamente
  } catch (error) {
      console.error("Error al obtener el precio total de los productos:", error);
      throw error;
  }
};
//2.9 *Calcular el promedio del precio sugerido (MSRP) de los productos:**
export const getAverageMSRP = async () => {
  try {
      const [rows] = await connection.query(`
          SELECT AVG(MSRP) AS averageMSRP
          FROM products
      `);
      return rows[0].averageMSRP; // Devolver el valor directamente
  } catch (error) {
      console.error("Error al obtener el promedio del MSRP:", error);
      throw error;
  }
};

//3.6 *Obtener el promedio de la cantidad de productos en stock por línea de productos:**
export const getAverageStockByProductLine = async () => {
  try {
      const [rows] = await connection.query(`
          SELECT p.productLine, AVG(p.quantityInStock) AS averageStock
          FROM products p
          JOIN productlines pl ON p.productLine = pl.productLine
          GROUP BY p.productLine
      `);
      return rows;
  } catch (error) {
      console.error("Error al obtener el promedio de stock por línea de productos:", error);
      throw error;
  }
};

//3.10 *Obtener la cantidad total de productos vendidos por cada línea de productos:**
export const getTotalProductsSoldByProductLine = async () => {
  try {
      const [rows] = await connection.query(`
          SELECT p.productLine, SUM(od.quantityOrdered) AS totalProductsSold
          FROM products p
          JOIN orderdetails od ON p.productCode = od.productCode
          GROUP BY p.productLine
      `);
      return rows;
  } catch (error) {
      console.error("Error al obtener la cantidad total de productos vendidos por línea de productos:", error);
      throw error;
  }
};

//3.13 *Obtener el promedio del precio de compra de los productos por línea de productos:**
export const getAverageBuyPriceByProductLine = async () => {
  try {
      const [rows] = await connection.query(`
          SELECT productLine, AVG(buyPrice) AS averageBuyPrice
          FROM products
          GROUP BY productLine
      `);
      return rows;
  } catch (error) {
      console.error("Error al obtener el precio promedio de compra por línea de productos:", error);
      throw error;
  }
};

//3.20 *Encontrar el promedio del precio de venta (priceEach) de los productos por línea de productos:**
export const getAverageSalePriceByProductLine = async (connection) => {
  try {
    const [rows] = await connection.query(`
      SELECT p.productLine, AVG(od.priceEach) AS average_sale_price 
      FROM products p 
      JOIN orderdetails od ON p.productCode = od.productCode 
      GROUP BY p.productLine;
    `);
    return rows;
  } catch (error) {
    console.error("Error al obtener el precio de venta promedio por línea de productos:", error);
    throw error;
  }
};