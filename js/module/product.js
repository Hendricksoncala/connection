
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




