import mysql from 'mysql2/promise';

    export const connection = await mysql.createConnection({
        host: 'roundhouse.proxy.rlwy.net',
        user: 'root',
        database: 'railway',
        port: 48029,
        password: "NsswzXBzwCLFOdwxgDPxClOIDkHTBYOk"
      });
    console.log("conexion de date de datos OK");    

