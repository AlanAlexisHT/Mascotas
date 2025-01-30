const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 4040;

app.use(bodyParser.json());
app.use(cors({
    origin:'http://localhost:4200',
}));

const db = new sqlite3.Database('mascotasDB', (err) =>{
    if(err){
        console.error("No conectado a la BBDD: ", err)
    }else{
        console.log("Conectado exitosamente.")
    }
});

app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});

app.get('/listaMascotas', (req,res) => {
    const query = 'SELECT * FROM mascotas';
    db.all(query, [], (err, results) => {
        if (err) {
            console.error('Error de consulta: ', err.message);
            res.status(500).send('Error en el servidor');
        } else {
            res.json(results);
        }
    });
});

app.get('/listaMascotas', (req,res)=> {
    const tipo = req.query.tipo;

    let query = 'SELECT * FROM mascotas';

    if(tipo){
        query += ' WHERE tipo = ?';
    }

    db.all(query,tipo ? [tipo] : [], (err,results) =>{
        if(err){
            console.error("Error de consulta: ",err);
            res.status(500).send("Error en el servidor.");
        }else{
            res.json(results);
        }
    });
});

app.get('/mascotas/:id', (req, res) => {
    const mascotaId = req.params.id;
    const query = 'SELECT * FROM mascotas WHERE id = ?';
    db.get(query, [mascotaId], (err, result) => {
        if (err) {
            console.error("Error al buscar registro con id: ", mascotaId);
            res.status(500).send('Error de servidor');
        } else {
            res.json(result);
        }
    });
});

app.post('/mascota', (req, res) => {
    const {nombre, tipo, descripcion, imagen} = req.body;
    const query = 'INSERT INTO mascotas (nombre, tipo, descripcion, imagen) VALUES (?, ?, ?, ?)';
    db.run(query, [nombre, tipo, descripcion, imagen], function (err) {
        if (err) {
            console.error('Error al guardar la mascota: ', err.message);
            res.status(500).send('Error en el servidor');
        } else {
            res.status(201).json({
                id: this.lastID,
                nombre,
                tipo,
                descripcion,
                imagen
            });
        }
    });
});

app.delete('/mascotas/:nombre', (req, res) => {
    const mascotaNombre = req.params.nombre;
    const query = 'DELETE FROM mascotas WHERE nombre = ?';

    db.run(query, [mascotaNombre], function (err) {
        if (err) {
            console.error('Error: ', err.message);
            res.status(500);
        } else if (this.changes === 0) {
            res.status(404).send('Registro no existente.');
        } else {
            res.status(200).json({ message:`Mascota con ID:${mascotaNombre} eliminada.`});
        }
    });
});

