const mongoose = require('mongoose');
const {Schema} = mongoose;

const ComentarioSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    date: { type: Date, default: Date.now}
})

module.exports = mongoose.model('Comentario', ComentarioSchema)