const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('contactos/add');
});

router.post('/add', (req, res) => {
    const { nombre, correo, telefono, mensaje } = req.body;
    const newcontacto = {
        nombre,
        correo,
        telefono,
        mensaje
    };
    console.log(newcontacto);
    res.send('received');
});

module.exports =router;