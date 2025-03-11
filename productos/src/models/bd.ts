import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: "172.30.190.228",
    port: 3306,
    user: "diego17",
    password: "1234",
    database: "productos_db",
});

// Conexión de prueba
pool
    .query("SELECT 1")
    .then(() => console.log("✅ Conectado a MySQL"))
    .catch((err: any) => {
        console.error("❌ Error al conectar a MySQL:", err);
    });