/*
-- DIA 1 --
*/
//Importacion de express en variable app
const express = require('express');
const app = express();

require('dotenv').config();

app.use(express.json());

//Definir el puerto
const port = process.env.PORT;

console.log(port)

//Ruta principal --> Endpoint
app.get('/',(req,res)=>{
    res.send('Holis!! Bienvenidos a expressssss!');
})

app.get('/saludo',(req,res)=>{
    res.send("otro endpoint care vrg")
})

app.post('/saludo',(req,res)=>{
    res.send("POST FALSO :bbbbbbbbb")
})

app.get('/mensaje',(req,res)=>{
    res.json({
        mensaje:"holiiiii"
    })
})


//Rta con parametro

app.get('/parametro/:nombre',(req,res)=>{
    const nombre = req.params.nombre;
    res.send(`Hola ${nombre}`);
})

//Ruta post que recibe un json
app.post('/json',(req,res)=>{
    const body = req.body;
    res.send(`Hola ${body.nombre}, el cual tiene ${body.edad} año/s!!!!!`)
})


//Iniciar el servidor
app.listen(port,()=>{
    console.log('Servidor Iniciado!');
})

