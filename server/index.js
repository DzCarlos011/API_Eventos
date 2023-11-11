const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "eventos",
    port: 3309
});

app.get("/create", (req, res) => {
    const nombre = req.body.nombre;
    const hora = req.body.hora;
    const fecha = req.body.fecha;
    const direccion = req.body.direccion;
    const estado = req.body.estado;
    const precio = req.body.precio;
    const contacto = req.body.contacto

    db.query('INSERT INTO eventos(nombre,hora,fecha,direccion,estado,precio,contacto) VALUES(?,?,?,?,?,?,?)', [nombre, hora, fecha, direccion, estado, precio, contacto],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/eventos", (req, res) => {

    db.query('SELECT * FROM eventos',
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});


app.listen(3001, () => {
    console.log("Usted esta corriendo el puerto 3001")
})