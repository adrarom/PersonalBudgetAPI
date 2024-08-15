const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionsController');
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Operaciones relacionadas con transacciones
 */

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Crear una nueva transacción
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               envelopeId:
 *                 type: string
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transacción creada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', protect, transactionController.createTransaction);

/**
 * @swagger
 * /api/transactions/envelope/{envelopeId}:
 *   get:
 *     summary: Obtener todas las transacciones de un sobre
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: envelopeId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del sobre
 *     responses:
 *       200:
 *         description: Lista de transacciones obtenida exitosamente
 *       404:
 *         description: Sobre no encontrado
 */
router.get('/envelope/:envelopeId', protect, transactionController.getEnvelopeTransactions);

/**
 * @swagger
 * /api/transactions/{id}:
 *   get:
 *     summary: Obtener una transacción por ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la transacción
 *     responses:
 *       200:
 *         description: Transacción obtenida exitosamente
 *       404:
 *         description: Transacción no encontrada
 */
router.get('/:id', protect, transactionController.getTransactionById);

/**
 * @swagger
 * /api/transactions/{id}:
 *   put:
 *     summary: Actualizar una transacción por ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la transacción
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transacción actualizada exitosamente
 *       400:
 *         description: Error en la solicitud
 *       404:
 *         description: Transacción no encontrada
 */
router.put('/:id', protect, transactionController.updateTransaction);

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Eliminar una transacción por ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la transacción
 *     responses:
 *       200:
 *         description: Transacción eliminada exitosamente
 *       404:
 *         description: Transacción no encontrada
 */
router.delete('/:id', protect, transactionController.deleteTransaction);

module.exports = router;
