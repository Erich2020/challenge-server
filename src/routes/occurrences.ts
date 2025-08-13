import express from 'express';
import isAuth from '../middlewares/isAuth';
import { validateRequest } from '../middlewares/index';
import {
  createOccurrenceValidators,
  OccurrencesController,
  updateOccurrenceValidators,
} from '../controllers/OccurrencesController';

const routes = express.Router();
const occurrencesController = new OccurrencesController();

/**
 * @swagger
 * /api/occurrence:
 *   post:
 *     summary: Create a new Occurrence
 *     tags: [Occurrence]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *               location:
 *                 type: string
 *               capacity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Create a new Occurrence
 */
routes.post(
  '/occurrence',
  isAuth,
  createOccurrenceValidators,
  validateRequest,
  occurrencesController.create,
);

/**
 * @swagger
 * /api/occurrences:
 *   get:
 *     summary: Get all occurrences
 *     tags: [Occurrence]
 *     responses:
 *       200:
 *         description: List of occurrences
 */
routes.get('/occurrences', isAuth, validateRequest, occurrencesController.list);

/**
 * @swagger
 * /api/occurrence/{id}:
 *   get:
 *     summary: Get a Occurrence
 *     tags: [Occurrence]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Occurrence id
 *     responses:
 *       200:
 *         description: Get a Occurrence
 */
routes.get('/occurrence/:id', isAuth, occurrencesController.get);

/**
 * @swagger
 * /api/occurrence/{id}:
 *   put:
 *     summary: Update a Occurrence
 *     tags: [Occurrence]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *               location:
 *                 type: string
 *               capacity:
 *                 type: string
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Occurrence id
 *     responses:
 *       200:
 *         description: Update a Occurrence
 */
routes.put(
  '/occurrence/:id',
  isAuth,
  updateOccurrenceValidators,
  occurrencesController.update,
);

/**
 * @swagger
 * /api/occurrence/{id}:
 *   delete:
 *     summary: Update a Occurrence
 *     tags: [Occurrence]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Occurrence id
 *     responses:
 *       200:
 *         description: Update a Occurrence
 */
routes.delete('/occurrence/:id', isAuth, occurrencesController.delete);

export default routes;
