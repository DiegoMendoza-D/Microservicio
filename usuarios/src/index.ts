import dot from 'dotenv'
import express from 'express'
import {usuariosRouters} from "./routers/index"

dot.config({path:'/home/taller4N/usuarios/src/.env'})

const app = express();
const port = process.env.PORT;

app.get('/',(req,res)=>{
    res.send('Hola usuario')
})

app.use("/usuario",usuariosRouters)


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Servicio de usuario corriendo en puerto ${PORT}`);
});