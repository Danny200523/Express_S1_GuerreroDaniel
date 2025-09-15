// Importa la configuración de las variables de entorno desde el archivo .env
import "dotenv/config";
// Importa el framework Express para crear y gestionar el servidor
import express from "express";

// Importa la clase DataBase para la conexión con la base de datos
import { DataBase } from "./config/db.js";

// Importa los componentes del patrón MVC (Modelo-Vista-Controlador) para la gestión de usuarios
import { UserModel } from "./models/userModel.js"; // Modelo de datos para los usuarios
import { UserRepository } from "./repositories/userRepository.js"; // Repositorio para interactuar con la base de datos de usuarios
import { UserService } from "./services/userService.js"; // Servicio que contiene la lógica de negocio para los usuarios
import { UserController } from "./controllers/userController.js"; // Controlador que maneja las peticiones HTTP para los usuarios
import { buildUserRouter } from "./routes/userRoutes.js"; // Función que construye las rutas (endpoints) para los usuarios

// Define la clase principal de la aplicación
class App {
    // El constructor se ejecuta al crear una nueva instancia de App
    constructor() {
        // Crea una instancia de Express
        this.app = express();
        // Obtiene el puerto desde las variables de entorno
        this.port = process.env.PORT;
        // Crea una instancia de DataBase con la URI de MongoDB
        this.db = new DataBase(process.env.MONGODB_URI);
    }

    // Método asíncrono para inicializar la aplicación
    async init() {
        // Conecta a la base de datos
        await this.db.connect();
        // Middleware para que Express pueda entender y procesar JSON en las peticiones
        this.app.use(express.json());
        // Define una ruta principal (GET /) para comprobar que el servicio está funcionando
        this.app.get('/', (req, res) => {
            res.json({
                ok: true,
                service: "Servicio CRUD de usuario"
            });
        });

        // Inyección de dependencias para el módulo de usuarios
        // Crea una instancia del repositorio de usuarios, pasándole el modelo de usuario
        const userRepo = new UserRepository(UserModel);
        // Crea una instancia del servicio de usuarios, pasándole el repositorio
        const userService = new UserService(userRepo);
        // Crea una instancia del controlador de usuarios, pasándole el servicio
        const userController = new UserController(userService);

        // Define las rutas para la API de usuarios, utilizando el controlador
        this.app.use('/api/users', buildUserRouter(userController));

        // Inicia el servidor para que escuche peticiones en el puerto especificado
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto: " + this.port);
        });
    }
}

// Crea una nueva instancia de la aplicación
const app = new App();

// Inicializa la aplicación
app.init();