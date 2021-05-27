const express = require('express');
const router = express.Router();

router.get('/restaurantes', (req, res) => {
    res.render('restaurantes.hbs');
})

module.exports = router;