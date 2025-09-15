// Paquete para conectarse a la base de datos y manejar los Ids tochos de mongo
import { MongoClient , ObjectId } from "mongodb";
// Paquete para cargar las variables de entorno y no dejar las contraseñas a la vista
import dotenv from "dotenv";
dotenv.config();


// Clase que se encarga de hacer las perrerías con los usuarios en la base de datos
export default class UserModel{
    // El constructor, lo que se ejecuta al crear un chisme de estos
    constructor(db){
        // Se crea el cliente de mongo con la dirección de la base de datos que está en el .env
        this.client = new MongoClient(process.env.MONGO_URI);
        // El nombre de la base de datos, que también está en el .env
        this.dbName = process.env.MONGO_DB;
    }

    // Función para conectarse a la base de datos, si ya está conectado, no hace el tonto y se queda como está
    async connect(){

        if (db) return db; // Si ya hay conexión, la devuelve y a correr
        await this.client.connect(); // Si no, se conecta
        db = client.db(this.dbName); // Selecciona la base de datos
        return db.collection("users"); // Y devuelve la colección de usuarios, que es donde está el lío
    }

    // Para crear un usuario nuevo, le pasas los datos y lo escupe en la base de datos
    async createUser(userData){
        const db = await this.connect();
        return await db.insertOne(userData);
    }

    // Para encontrar un usuario por su correo, que no se repite
    async findUserByEmail(email){
        const db = await this.connect();
        return await db.findOne({email: email});
    }

    // Para encontrar un usuario por su Id, el churro ese largo que genera mongo
    async findUserById(id){
        const db = await this.connect();
        return await db.findOne({_id: new ObjectId(id)});
    }

    // Para actualizar los datos de un usuario, le pasas el Id y los datos nuevos
    async updateUser(id, userData){
        const db = await this.connect();
        return await db.updateOne({_id: new ObjectId(id)}, {$set: userData});
    }

    // Para borrar un usuario, le pasas el Id y ¡a la calle!
    async deleteUser(id){
        const db = await this.connect();
        return await db.deleteOne({_id: new ObjectId(id)});
    }
    // Para encontrar a todos los usuarios, te devuelve un array con todos los que haya
    async findUsers(){
        const db = await this.connect();
        return await db.find({}).toArray();
    }
}