db.createCollection("campers", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "nombre",
        "apellido",
        "direccion",
        "acudientes",
        "celular",
        "Estado",
        "Curso",
        "Riesgo",
        "notainicial",
        "fechaInicio",
        "fechaFin"
      ],
      properties: {
        nombre: {
          bsonType: "string",
          description: "Nombre del camper (obligatorio)"
        },
        apellido: {
          bsonType: "string",
          description: "Apellido del camper (obligatorio)"
        },
        direccion: {
          bsonType: "string",
          description: "Dirección de residencia (obligatoria)"
        },
        acudientes: {
          bsonType: "string",
          description: "Nombre del acudiente (obligatorio)"
        },
        celular: {
          bsonType: "long",
          description: "Número de celular (obligatorio, numérico)"
        },
        Estado: {
          bsonType: "object",
          required: [
            "Aprobado",
            "Cursando",
            "En proceso de ingreso",
            "Expulsado",
            "Graduado",
            "Inscrito",
            "Retirado"
          ],
          properties: {
            Aprobado: { bsonType: "bool" },
            Cursando: { bsonType: "bool" },
            ProcesoIngreso: { bsonType: "bool" },
            Expulsado: { bsonType: "bool" },
            Graduado: { bsonType: "bool" },
            Inscrito: { bsonType: "bool" },
            Retirado: { bsonType: "bool" }
          },
          description: "Estados posibles del camper (todos booleanos)"
        },
        Curso: {
          bsonType: "string",
          description: "Curso asignado, puede estar vacío si aún no aplica"
        },
        Riesgo: {
          enum: ["Bajo", "Medio", "Alto"],
          description: "Nivel de riesgo académico (Bajo, Medio o Alto)"
        },
        notainicial: {
          bsonType: "int",
          minimum: 0,
          maximum: 100,
          description: "Nota inicial del camper (0 a 100)"
        },
        fechaInicio: {
          bsonType: "date",
          description: "Fecha de inicio del proceso"
        },
        fechaFin: {
          bsonType: "date",
          description: "Fecha de finalización del proceso"
        }
      }
    }
  }
})

db.createCollection("trainers", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["Nombre", "Jornada", "Ruta"],
      properties: {
        Nombre: {
          bsonType: "string",
          description: "Nombre del trainer (obligatorio)"
        },
        Jornada: {
          enum: ["FullTime", "PartTime"],
          description: "Jornada laboral del trainer (FullTime o PartTime)"
        },
        Ruta: {
          enum: ["Java", "NodeJS", ".NET"],
          description: "Ruta de especialidad del trainer"
        }
      }
    }
  }
})

db.createCollection("rutas", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["Nombre", "Jornada", "Ruta"],
        properties: {
          Nombre: {
            bsonType: "string",
            description: "Nombre del trainer (obligatorio)"
          },
          Jornada: {
            enum: ["FullTime"],
            description: "Jornada laboral del trainer"
          },
          Ruta: {
            enum: ["Java", "NodeJS",".NET"],
            description: "Ruta de formación asignada al trainer"
          }
        }
      }
    }
})
