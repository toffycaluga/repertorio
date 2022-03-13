import express from "express";
import { insertar, consultar, eliminar, editar } from "./db.js";

const app = express()


app.use(express.static('static'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/canciones', async(req, res) => {
    const repertorios = await consultar()
    res.json(repertorios)
})

app.post('/cancion', async(req, res) => {
    let data = req.body;
    await insertar(data.cancion, data.artista, data.tono)
    res.json({ todo: 'ok' })
})

app.put('/cancion', async(req, res) => {
    const data = req.body
    await editar(data.id, data.cancion, data.artista, data.tono);
    res.json({ todo: 'ok' })
})

app.delete('/cancion', async(req, res) => {
    const id = req.query.id;
    await eliminar(id)
    res.json({ todo: 'ok' })
})
app.listen(3000, () =>
    console.log('Servidor ejecutando en puerto 3000')
);