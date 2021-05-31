const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');


//inicializaciones
const app = express();
require('./database');
require('./config/passport');

//setting
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    defaultLayout: path.join(app.get('views') , 'main.hbs'),
    partialsDir: path.join(app.get('views') , 'partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs');

//middlewares 
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'usuario', 
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
//variables globales 
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//routes
app.use(require('./routes/index'));
app.use(require('./routes/restaurantes'));
app.use(require('./routes/users'));
app.use(require('./routes/reservar'));
app.use(require('./routes/mapa'));
app.use(require('./routes/misreservas'));

//static files
app.use(express.static(path.join(__dirname, 'public')));


//server is listinning
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
