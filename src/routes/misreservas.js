const express = require('express');
const router = express.Router();


const Reserva = require('../models/Reserva');
const {isAuthenticated} = require('../helpers/auth');



router.post('/misreservas', isAuthenticated, async (req, res) => {
    const {nameRestaurante, numComensales, distribucion, numTelefono, fecha, hora } = req.body;
    
    const newReserva = new Reserva({nameRestaurante, numComensales, distribucion, numTelefono, fecha, hora});
    await newReserva.save();
    res.redirect('/misreservas');
    });

    router.get('/misreservas', isAuthenticated, async (req, res) => {
        const misReservas = await Reserva.find().lean().sort({date: 'desc'});
        res.render('misReservas' , {misReservas});
    });

    router.get('/misreservas/edit/:id', isAuthenticated, async (req, res) => {
        const misReservas = await Reserva.findById(req.params.id).lean();
        res.render('edit-reservas' , {misReservas});
    });
    router.put('/misreservas/edit/:id', isAuthenticated, async (req, res) => {
        const {numComensales, distribucion, numTelefono, fecha, hora} = req.body;
        await Reserva.findByIdAndUpdate(req.params.id, {numComensales, distribucion, numTelefono, fecha, hora}).lean();
        res.redirect('/misreservas') 
    });

module.exports = router;