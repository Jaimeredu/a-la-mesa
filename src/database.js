const mongoose = require('mongoose');

mongoose.connect('mongodb://JaimeRedu:usuariojaimeredu@a-la-mesa.0ra72.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
})

.then(db => console.log('BD is connected'))
.catch(err => console.error(err));