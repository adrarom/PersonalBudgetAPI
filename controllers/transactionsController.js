const Transaction = require('../models/Transaction');
const Envelope = require('../models/Envelope');

exports.createTransaction = async (req, res) => {
    try {
        const { amount, description, envelopeId } = req.body;

        const envelope = await Envelope.findById(envelopeId);
        if (!envelope) {
            return res.status(404).json({ message: 'Envelope no encontrado' });
        }

        const newTransaction = new Transaction({
            amount,
            description,
            envelope: envelopeId,
        });

        const transaction = await newTransaction.save();

        envelope.balance -= amount;
        await envelope.save();

        envelope.transactions.push(transaction._id);
        await envelope.save();

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la transacción', error: error.message });
    }
};

exports.getEnvelopeTransactions = async (req, res) => {
    try {
        const envelopeId = req.params.envelopeId;

        const envelope = await Envelope.findById(envelopeId);
        if (!envelope) {
            return res.status(404).json({ message: 'Envelope no encontrado' });
        }

        const transactions = await Transaction.find({ envelope: envelopeId });

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las transacciones', error: error.message });
    }
};

exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: 'Transacción no encontrada' });
        }

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la transacción', error: error.message });
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        const { amount, description } = req.body;

        const transaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            { amount, description },
            { new: true }
        );

        if (!transaction) {
            return res.status(404).json({ message: 'Transacción no encontrada' });
        }

        const envelope = await Envelope.findById(transaction.envelope);
        if (envelope) {
            envelope.balance += transaction.amount - amount;
            await envelope.save();
        }

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la transacción', error: error.message });
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: 'Transacción no encontrada' });
        }

        const envelope = await Envelope.findById(transaction.envelope);
        if (envelope) {
            envelope.balance += transaction.amount;
            await envelope.save();

            envelope.transactions.pull(transaction._id);
            await envelope.save();
        }
        await Transaction.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Transacción eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la transacción', error: error.message });
    }
};
