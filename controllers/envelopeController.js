const Envelope = require('../models/Envelope');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.createEnvelope = async (req, res) => {
    try {
        const { name, budget } = req.body;
        const userId = req.user.id;


        const newEnvelope = new Envelope({
            name,
            budget,
            balance: budget,
            owner: userId,
        });

        const envelope = await newEnvelope.save();

        await User.findByIdAndUpdate(userId, { $push: { envelopes: envelope._id } });

        res.status(201).json(envelope);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el envelope', error: error.message });
    }
};

exports.getUserEnvelopes = async (req, res) => {
    try {
        const userId = req.user.id;

        const envelopes = await Envelope.find({ owner: userId }).populate('transactions');

        res.status(200).json(envelopes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los envelopes', error: error.message });
    }
};

exports.getEnvelopeById = async (req, res) => {
    try {
        const envelope = await Envelope.findById(req.params.id).populate('transactions');

        if (!envelope) {
            return res.status(404).json({ message: 'Envelope no encontrado' });
        }

        res.status(200).json(envelope);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el envelope', error: error.message });
    }
};

exports.updateEnvelope = async (req, res) => {
    try {
        const { name, budget, balance } = req.body;

        const envelope = await Envelope.findByIdAndUpdate(
            req.params.id,
            { name, budget, balance },
            { new: true }
        );

        if (!envelope) {
            return res.status(404).json({ message: 'Envelope no encontrado' });
        }

        res.status(200).json(envelope);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el envelope', error: error.message });
    }
};

exports.deleteEnvelope = async (req, res) => {
    try {
        const envelope = await Envelope.findById(req.params.id).populate('transactions');

        if (!envelope) {
            return res.status(404).json({ message: 'Envelope no encontrado' });
        }

        await Transaction.deleteMany({ _id: { $in: envelope.transactions } });

        await Envelope.findByIdAndDelete(req.params.id);

        await User.findByIdAndUpdate(envelope.owner, { $pull: { envelopes: envelope._id } });

        res.status(200).json({ message: 'Envelope eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el envelope', error: error.message });
    }
};
