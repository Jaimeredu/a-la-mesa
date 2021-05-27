const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://JaimeRedu:usuariojaimeredu@a-la-mesa.0ra72.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
});