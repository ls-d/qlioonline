const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('contactos/add');
});

router.post('/add', async (req, res) => {
    const { nombre, correo, telefono, mensaje } = req.body;
    const newcontacto = {
        nombre,
        correo,
        telefono,
        mensaje,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO contactos set ?', [newcontacto]);
    req.flash('success', 'Mensaje guardado satisfactoriamente');
    res.redirect('/contactos');
});

router.get('/', async (req, res) => {
    const contactos = await pool.query('SELECT * FROM contactos WHERE user_id = ?', [req.user.id]);    
    res.render('contactos/list', {contactos});
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM contactos WHERE ID = ?', [id]);
    req.flash('success', 'Mensaje eliminado satisfactoriamente');
    res.redirect('/contactos');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const contactos = await pool.query('SELECT * FROM contactos WHERE id = ?', [id]);
    res.render('contactos/edit', {contacto: contactos [0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, telefono, mensaje } = req.body;
    const newContacto = {
        nombre,
        correo,
        telefono,
        mensaje
    };
    await pool.query('UPDATE contactos set ? WHERE id = ?', [newContacto, id]);
    req.flash('success', 'Mensaje actualizado satisfactoriamente');
    res.redirect('/contactos');
});

module.exports = router;