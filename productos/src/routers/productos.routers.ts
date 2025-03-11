import { Router } from 'express';
import {pool} from '../models/bd.ts';


const router = Router();

router.get('/all', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

export default router;
