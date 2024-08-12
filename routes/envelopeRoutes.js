const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, createEnvelope);

router.get('/', protect, getEnvelopes);

router.get('/:id', protect, getEnvelopeById);

router.put('/:id', protect, updateEnvelope);

router.delete('/:id', protect, deleteEnvelope);

module.exports = router;

module.exports = router;
