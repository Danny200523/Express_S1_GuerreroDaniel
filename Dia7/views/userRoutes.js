import express from "express";
import jwt from "jsonwebtoken";
import UserController from "../controllers/userController.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const userController = new UserController();

function authMiddleware(req,res,next){
    const diccionarioHeader = req.headers;
    const token = diccionarioHeader.authorization;
    if (!token) {
        return res.status(403).json({msg:'No hay token, acceso denegado'});
    }
    jwt.verify(token,process.env.JWT_SECRET,(err, decoded)=>{
        if (err) return res.status(401).json({msg:'Token no válido'});
        req.user = decoded;
        next();
    });
}

// Rutas públicas
router.post('/register',(req,res)=>userController.register(req,res));
router.delete('/login',(req,res)=>userController.login(req,res));
// Rutas Protegidas
router.put('/update',authMiddleware,(req,res)=>userController.updateUser(req,res));
router.put('/update-password',authMiddleware,(req,res)=>userController.updatePassword(req,res));


export default router;