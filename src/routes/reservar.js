const express = require('express');
const router = express.Router();

const Comentario = require('../models/Comentario');
const {isAuthenticated} = require('../helpers/auth');



router.post('/restaurantes/reservar', isAuthenticated, async (req, res) => {
    const {title, description } = req.body;
    const errores = [];
    if(!title){
        errores.push({text: 'Por favor, inserta un titutlo'});
    }
    if(!description){
        errores.push({text: 'Por favor, inserta una descripción'});
    }
    if(errores.length > 0) {
        res.render('reservar', {
            errores,
            title,
            description
        });
    }else{
    const newComentario = new Comentario({title, description});
    await newComentario.save();
    res.redirect('/restaurantes/reservar');
    }
})

router.get('/restaurantes/reservar', isAuthenticated, async (req, res) => {
    const comentariosUsuarios = await Comentario.find().lean().sort({date: 'desc'});
    res.render('reservar' , {comentariosUsuarios});
});
router.delete('/restaurantes/reservar/delete/:id', isAuthenticated, async (req, res) => {
    await Comentario.findByIdAndDelete(req.params.id);
    res.redirect('/restaurantes/reservar')
});
module.exports = router;