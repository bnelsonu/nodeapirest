const express = require("express"); //llamar o importar express

//manejar mejor los datos del post
const bodyParser = require("body-parser");

const app = express(); //se reasigna express a app

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //manejar los datos en formato json para le post // a la hora de la peticion se indicará la cabecera Content-Type


//definir las propiedades de los usuarios
let usuario = {
    nombre: '',
    apellido: ''
};

//definir la estructura de la respuesta
let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};

//codigo de ejemplo
/* app.get("/hola", (req, res) => {
    res.send("[GET]Saludos desde express"); // le dimos una ruta raíz que será la que reciba la entrada nuestras peticiones
});

app.post("/hola", (req, res) => {
    res.send("[POST]Saludos desde express"); // le dimos una ruta raíz que será la que reciba la entrada nuestras peticiones
});

// llamar a listen y le pasamos los parametros necesarios para iniciar nuestro server
app.listen(3000, () => {
    console.log("el serivdor está inicializado en el puerto 3000");
}); */

// en este punto no hay ninguna declaración no hay una ruta a dónde pueda ir añadir app.get arriba del listen

//debemos instalar body parser  npm install body-parser --save //manejo de datos en POST

//entrada base de nuestro api 
app.get('/', function (req, res) {
    respuesta = {
        error: true,
        codigo: 200,
        mensaje: 'Punto de inicio'
    };
    res.send(respuesta);
});

/*revisaremos si el cliente ya está creado /si no se ha creado asignamos el error a 
nuestra variable de respuesta en otro caso mandamos el usuario en la respuesta
*/
app.get('/usuario', function (req, res) {
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: ''
    };
    if (usuario.nombre === '' || usuario.apellido === '') {
        respuesta = {
            error: true,
            codigo: 501,
            mensaje: 'El usuario no ha sido creado'
        };
    } else {
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'respuesta del usuario',
            respuesta: usuario
        };
    }
    res.send(respuesta);
});

/*revisaremos  el cuerpo del post incluye nombre y el apellido, si no lo incluye, mostraremos un error, si lo incluye pero el usuario 
está vacío, mostramos un error, pero si no está vacío e incluye los parámetros solicitados, entonces lo creamos y le respondemos al cliente con la información
*/


app.post('/usuario', function (req, res) {
    if (!req.body.nombre || !req.body.apellido) {
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'El campo nombre y apellido son requeridos'
        };
    } else {
        if (usuario.nombre !== '' || usuario.apellido !== '') {
            respuesta = {
                error: true,
                codigo: 503,
                mensaje: 'El usuario ya fue creado previamente'
            };
        } else {
            usuario = {
                nombre: req.body.nombre,
                apellido: req.body.apellido
            };
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: 'Usuario creado',
                respuesta: usuario
            };
        }
    }

    res.send(respuesta);
});

/*
en put vamos a recibir la solicitud, seguimos la misma lógica que POST pero, si en este caso, está vacío el nombre o el apellido significa que no ha sido 
creado el usuario, por lo tanto no hay nada que actualizar sinembargo si no está vacío recibimos ambos parámetros y actualizamos al usuario 
*/

app.put('/usuario', function (req, res) {
    if (!req.body.nombre || !req.body.apellido) {
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'El campo nombre y apellido son requeridos'
        };
    } else {
        if (usuario.nombre === '' || usuario.apellido === '') {
            respuesta = {
                error: true,
                codigo: 501,
                mensaje: 'El usuario no ha sido creado'
            };
        } else {
            usuario = {
                nombre: req.body.nombre,
                apellido: req.body.apellido
            };
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: 'Usuario actualizado',
                respuesta: usuario
            };
        }
    }

    res.send(respuesta);
});

/*
    se elimina el usuario
*/


app.delete('/usuario', function (req, res) {
    if (usuario.nombre === '' || usuario.apellido === '') {
        respuesta = {
            error: true,
            codigo: 501,
            mensaje: 'El usuario no ha sido creado'
        };
    } else {
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'Usuario eliminado'
        };
        usuario = {
            nombre: '',
            apellido: ''
        };
    }
    res.send(respuesta);
});

// en caso que no coincida con las entradas definidas 
app.use(function (req, res, next) {
    respuesta = {
        error: true,
        codigo: 404,
        mensaje: 'URL no encontrada'
    };
    res.status(404).send(respuesta);
});
app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});