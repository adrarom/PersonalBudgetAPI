const mongoose = require('mongoose');

const envelopeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
        default: 0,
    },
    balance: {
        type: Number,
        required: true,
        default: 0,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
    }],
});

const Envelope = mongoose.model('Envelope', envelopeSchema);

module.exports = Envelope;
