const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
    },
    envelope: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Envelope',
        required: true,
    },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
