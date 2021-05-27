const express = require('express');
const router = express.Router();
const User = require('../models/User');


const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('signin');
})
router.get('/users/signup', (req, res) => {
    res.render('signup');
})
router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/signin',
    failureFlash: true
}));



router.post('/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;

    const newUser = new User({ name, email, password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    res.redirect('/users/signin');
});

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/users/signin')
});
module.exports = router;