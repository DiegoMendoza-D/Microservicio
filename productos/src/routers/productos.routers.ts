import { Router } from 'express';
import { pool } from '../models/bd.ts';



const router = Router();

// Obtener todos los productos
router.get('/all', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

router.post('/create', async (req, res) => {
    try {
        console.log("Body recibido:", req.body); // Ver qué está recibiendo exactamente

        const { nombre, precio, stock } = req.body;

        if (!nombre || !precio || !stock) {
            res.status(400).json({ error: 'Faltan campos requeridos' });
            return;
        }

        const query = 'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)';
        const [result]: any = await pool.query(query, [nombre, precio, stock]);

        res.status(201).json({ message: 'Producto creado correctamente', id: result.insertId });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Actualizar un producto
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, stock } = req.body;

        // Convertir el ID a número
        const productId = parseInt(id, 10);

        // Verificar si el ID es válido
        if (isNaN(productId)) {
            res.status(400).json({ error: 'ID no válido' });
            return;
        }

        // Verificar si los campos requeridos están presentes
        if (!nombre || !precio || !stock) {
            res.status(400).json({ error: 'Faltan campos requeridos' });
            return;
        }

        const query = 'UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?';
        const [result]: any = await pool.query(query, [nombre, precio, stock, productId]);

        if (result.affectedRows > 0) {
            res.json({ message: 'Producto actualizado correctamente' });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Eliminar un producto
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Convertir el ID a número
        const productId = parseInt(id, 10);

        // Verificar si el ID es válido
        if (isNaN(productId)) {
            res.status(400).json({ error: 'ID no válido' });
            return;
        }

        const query = 'DELETE FROM productos WHERE id = ?';
        const [result]: any = await pool.query(query, [productId]);

        if (result.affectedRows > 0) {
            res.json({ message: 'Producto eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});



export default router; 