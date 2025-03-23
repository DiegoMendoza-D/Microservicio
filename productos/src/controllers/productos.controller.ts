import { Request, Response } from 'express';
import { pool } from '../models/bd.ts';
import { ResultSetHeader } from 'mysql2';

// Obtener todos los productos
export const getAllProductos = async (req: Request, res: Response): Promise<void> => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Crear un nuevo producto (POST)
export const postProducto = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log(req.body)
        const { nombre, precio, peso } = req.body;

        // Verificar si los campos requeridos están presentes
        if (!nombre || !precio || !peso) {
            res.status(400).json({ error: 'Faltan campos requeridos' });
            return;
        }

        const query = 'INSERT INTO productos (nombre, precio, peso) VALUES (?, ?, ?)';
        const [result] = await pool.query<ResultSetHeader>(query, [nombre, precio, peso]);

        if (result.affectedRows > 0) {
            res.status(201).json({ message: 'Producto creado correctamente', id: result.insertId });
        } else {
            res.status(500).json({ error: 'No se pudo crear el producto' });
        }
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Modificar un producto (PUT)
export const putProducto = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, nombre, precio, peso } = req.body;

        // Verificar si los campos requeridos están presentes
        if (!id || !nombre || !precio || !peso) {
            res.status(400).json({ error: 'Faltan campos requeridos' });
            return;
        }

        const query = 'UPDATE productos SET nombre = ?, precio = ?, peso = ? WHERE id = ?';
        const [result] = await pool.query<ResultSetHeader>(query, [nombre, precio, peso, id]);

        if (result.affectedRows > 0) {
            res.json({ message: 'Producto actualizado correctamente' });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al modificar producto:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Eliminar un producto (DELETE)
export const deleteProducto = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        console.log(`ID recibido: ${id}`); // Depuración: Verifica el ID recibido

        // Verificar si el ID está presente
        if (!id) {
            res.status(400).json({ error: 'ID no proporcionado' });
            return;
        }

        // Convertir el ID a número (si es necesario)
        const productId = parseInt(id, 10);

        if (isNaN(productId)) {
            res.status(400).json({ error: 'ID no válido' });
            return;
        }

        // Consulta SQL para eliminar un producto
        const query = 'DELETE FROM productos WHERE id = ?';
        console.log(`Consulta SQL: ${query}`); // Depuración: Verifica la consulta SQL

        // Ejecutar la consulta
        const [result] = await pool.query<ResultSetHeader>(query, [productId]);

        console.log('Resultado de la consulta:', result); // Depuración: Verifica el resultado

        // Verificar si se eliminó algún registro
        if (result.affectedRows > 0) {
            res.json({ message: 'Producto eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar producto:', error); // Depuración: Verifica el error
        res.status(500).json({ error: 'Error en el servidor' });
    }
};
