import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

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
app.get('/', async (req, res) => {
    try {
        const response = await fetch('http://localhost:3001/test');
        const data = await response.json();
        res.json({
            gateway_message: 'Conexión exitosa desde API Gateway',
            productos_response: data
        });
    } catch (error: any) { // Especificamos el tipo any para el error
        res.status(500).json({ 
            error: 'Error al conectar con el servicio de productos',
            details: error?.message || 'Error desconocido'
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway corriendo en puerto ${PORT}`);
});