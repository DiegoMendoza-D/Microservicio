import dot from 'dotenv';
import express from 'express';
import { productosRouters } from "./routers/index.ts";

dot.config({ path: '/home/taller4N/productos/src/.env' });

const app = express();
const port = process.env.PORT;

// Middleware para manejar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hola Productos');
});

app.use("/productos", productosRouters);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servicio de Productos corriendo en puerto ${PORT}`);
});
