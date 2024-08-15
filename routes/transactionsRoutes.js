const express = require('express');
const router = express.Router();
const { createEnvelope, getUserEnvelopes, getEnvelopeById, updateEnvelope, deleteEnvelope } = require('../controllers/envelopeController');
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Envelopes
 *   description: Operaciones relacionadas con sobres
 */

/**
 * @swagger
 * /api/envelopes:
 *   post:
 *     summary: Crear un nuevo sobre
 *     tags: [Envelopes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               budget:
 *                 type: number
 *     responses:
 *       201:
 *         description: Sobre creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/api/envelopes', protect, createEnvelope);

/**
 * @swagger
 * /api/envelopes:
 *   get:
 *     summary: Obtener todos los sobres del usuario
 *     tags: [Envelopes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de sobres obtenida exitosamente
 *       401:
 *         description: No autorizado
 */
router.get('/api/envelopes', protect, getUserEnvelopes);

/**
 * @swagger
 * /api/envelopes/{id}:
 *   get:
 *     summary: Obtener un sobre por ID
 *     tags: [Envelopes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del sobre
 *     responses:
 *       200:
 *         description: Sobre obtenido exitosamente
 *       404:
 *         description: Sobre no encontrado
 */
router.get('/api/envelopes/:id', protect, getEnvelopeById);

/**
 * @swagger
 * /api/envelopes/{id}:
 *   put:
 *     summary: Actualizar un sobre por ID
 *     tags: [Envelopes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del sobre
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               budget:
 *                 type: number
 *     responses:
 *       200:
 *         description: Sobre actualizado exitosamente
 *       400:
 *         description: Error en la solicitud
 *       404:
 *         description: Sobre no encontrado
 */
router.put('/api/envelopes/:id', protect, updateEnvelope);

/**
 * @swagger
 * /api/envelopes/{id}:
 *   delete:
 *     summary: Eliminar un sobre por ID
 *     tags: [Envelopes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del sobre
 *     responses:
 *       200:
 *         description: Sobre eliminado exitosamente
 *       404:
 *         description: Sobre no encontrado
 */
router.delete('/api/envelopes/:id', protect, deleteEnvelope);

module.exports = router;