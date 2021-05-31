const express = require('express');
const router = express.Router();


const Reserva = require('../models/Reserva');
const {isAuthenticated} = require('../helpers/auth');



router.post('/misreservas', isAuthenticated, async (req, res) => {
    const {nameRestaurante, numComensales, distribucion, anotaciones, numTelefono, fecha, hora } = req.body;
    
    const newReserva = new Reserva({nameRestaurante, numComensales, distribucion, numTelefono, fecha, hora});
    newReserva.user = req.user.id;
    await newReserva.save();
    res.redirect('/misreservas');
    });

    router.get('/misreservas', isAuthenticated, async (req, res) => {
        const misReservas = await Reserva.find({user: req.user.id}).lean();
        res.render('misReservas' , {misReservas});
    });

module.exports = router;