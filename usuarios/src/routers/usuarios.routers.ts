import { Router } from "express";
import { getAll } from "../controllers/usuarios.controller";
const ruta = Router()

ruta.get("/all",getAll)

export default ruta;