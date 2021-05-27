const passport = require ('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    const user = await User.findOne({email: email});
    if(!user){
        return done(null, false, {message: 'Usuario no encontrado'});
    }else{
    const macth  = await user.matchPassword(password);
    if(macth){
        return done(null, user);
    }else {
        return done(null, false, {message: 'Contraseña erronea'});
    }
}
}));

passport.serializeUser(function(user, done) {
    done(null, user._id);

});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
