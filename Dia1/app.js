const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());
const port = process.env.PORT;


class Camper{ 
    constructor(nombre,apellido,direccion,acudiente,celular,curso,riesgo,notaInicial){ 
        this.nombre = nombre; 
        this.apellido = apellido; 
        this.direccion = direccion; 
        this.acudiente = acudiente; 
        this.celular = celular; 
        this.curso = curso; 
        this.riesgo = riesgo; 
        this.notaInicial = notaInicial; 
        this.fechaInicio = new Date(); 
        this.fechaFin = new Date(this.fechaInicio); 
        this.fechaFin.setMonth(this.fechaFin.getMonth() + 10);
    } 
}

class FuncionesCamper{
    registroCamper(){

    }
}




//Ruta principal --> Endpoint
app.get('/',(req,res)=>{
    res.send('Holis!! Bienvenidos a expressssss!');
})

app.get('/saludo',(req,res)=>{
    res.send("otro endpoint")
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

