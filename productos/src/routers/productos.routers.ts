import { Router } from "express";
import { getAll } from "../controllers/productos.controller.ts";
const ruta = Router()

ruta.get("/all",getAll)

export default ruta;