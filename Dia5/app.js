import "dotenv/config";
import express from "express";

//IMportacion BBDD
import { DataBase } from "./config/db.js";

//Importacion MVC
import {UserModel} from "./models/userModel.js"
import { UserRepository } from "./repositories/userRepository.js";
import { UserService } from "./services/userService.js";
import { UserController } from "./controllers/userController.js";
import { buildUserRouter } from "./routes/userRoutes.js";

class App{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.db = new DataBase(process.env.MONGODB_URI);
    }
    async init(){
        await this.db.connect;
        this.app.use(express.json());//middleware para JSON
        this.app.get('/', (req,res)=>{
            res.json({
                ok:true,
                service:"Servicio CRUD de usuario"
            })
        })
    //Inyeccion de dependencias para User
    const userRepo = new UserRepository(UserModel);
    const userService = new UserService(userRepo);
    const userController = new UserController(userService);

    //Rutas
    this.app.use('/api/users',buildUserRouter(userController));

    //Aranque
    this.app.listen(this.port,()=>{
        console.log("Servidor corriendo en el puerto: " + this.port)
    })
    }
}

const app = new App();

app.init()