const mongoose = require('mongoose');
const {Schema} = mongoose;

const ReservaSchema = new Schema({
    nameRestaurante: {type: String, required: true},
    numComensales: { type: Number, required: true},
    distribucion: { type: String, required: true},
    numTelefono: { type: String, required: true},
    fecha: { type: String, required: true},
    hora: {type: String, required: true},
    date: { type: Date, default: Date.now}
})

module.exports = mongoose.model('Reserva', ReservaSchema)