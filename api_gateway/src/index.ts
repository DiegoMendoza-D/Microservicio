import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from "axios";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba del API Gateway
app.get('/test', (req, res) => {
    res.json({ 
        message: 'API Gateway funcionando correctamente',
        service: 'API Gateway',
        port: process.env.PORT || 3000
    });
});

// Ruta para probar la conexión con el servicio de productos

app.get("/productos", async (req, res) => {
    try { 
      const response = await axios.get("http://localhost:3001/productos/all"); 
      res.json(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      res.status(500).send("Error al obtener productos");
    }
  });
  
  // Redirigir a usuarios
  app.get("/usuarios", async (req, res) => {
    try {
      const response = await axios.get("http://localhost:3002/usuario/all");
      res.json(response.data); 
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      res.status(500).send("Error al obtener usuarios");
    }
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway corriendo en puerto ${PORT}`);
});