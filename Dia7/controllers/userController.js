/*
-- Logica del JWT
*/

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

export default class userController{
    constructor(){

        this.userModel = new UserModel();
    }

    async register(req,res){
        try {
            const {name, email, password} = req.body;
            const existingUser = await this.userModel.findUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({msg:'El usuario ya existe'});
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                name,
                email,
                contraseña: hashedPassword
            };
            await this.userModel.createUser(newUser);
            return res.status(201).json({msg:'Usuario registrado exitosamente'});
        } catch (err) {
            res.status(500).json({msg:err.message});
        }
    }

    async login(req,res){
        try {
            const {email, password} = req.body;
            const existingUser = await this.userModel.findUserByEmail(email);
            if (!existingUser) {
                return res.status(404).json({msg:'El usuario no existe'});
            }

            //Verificar la contraseña
            const pssValid = bcrypt.compare(password, existingUser.password);
            if (!pssValid) {
                return res.status(401).json({msg:'Contraseña incorrecta'});
            }

            //Crear el token
            const token = jwt.sign({id : existingUser._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES});
            res.status(200).json({
                msg:"Login Exitoso",
                token
            })
        } catch (err) {
            res.status(500).json({msg:err.message});
        }
    }

    async updateUser(req,res){
        try {
            const {id} = req.user;
            const {name, email} = req.body;
            
            await this.userModel.updateUser(id, {name, email});
            res.status(200).json({msg:'Usuario actualizado exitosamente'});
        } catch (err) {
            res.status(500).json({msg:err.message});
        }
    }

    async updatePassword(req,res){
        try {
            const {id} = req.user;
            const {password} = req.body;
            
            const hashedPassword = await bcrypt.hash(password, 10);
            await this.userModel.updateUser(id,{password : hashedPassword});
            res.status(200).json({msg:'Contraseña actualizada exitosamente'});
        } catch (err) {
            res.status(500).json({msg:err.message});
        }
    }
}