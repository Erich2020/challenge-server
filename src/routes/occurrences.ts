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
 *     summary: Crear un nuevo evento
 *     description: Permite al usuario autenticado crear un nuevo evento. La fecha debe ser futura.
 *     tags: [Occurrence]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - date
 *               - location
 *               - capacity
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del evento
 *                 example: "Conferencia de Tecnología"
 *                 minLength: 1
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Fecha del evento (debe ser futura)
 *                 example: "2024-12-25"
 *               location:
 *                 type: string
 *                 description: Ubicación del evento
 *                 example: "Centro de Convenciones"
 *                 minLength: 1
 *               capacity:
 *                 type: number
 *                 description: Capacidad máxima del evento
 *                 example: 100
 *                 minimum: 0
 *     responses:
 *       201:
 *         description: Evento creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID único del evento
 *                 name:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *                 location:
 *                   type: string
 *                 capacity:
 *                   type: number
 *                 createdBy:
 *                   type: string
 *                   description: ID del usuario que creó el evento
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: Token JWT inválido o faltante
 *       403:
 *         description: La fecha del evento debe ser futura
 *       500:
 *         description: Error interno del servidor
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
 *     summary: Obtener todos los eventos
 *     description: Lista todos los eventos disponibles en el sistema
 *     tags: [Occurrence]
 *     responses:
 *       200:
 *         description: Lista de eventos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID único del evento
 *                   name:
 *                     type: string
 *                     description: Nombre del evento
 *                   date:
 *                     type: string
 *                     format: date
 *                     description: Fecha del evento
 *                   location:
 *                     type: string
 *                     description: Ubicación del evento
 *                   capacity:
 *                     type: number
 *                     description: Capacidad máxima del evento
 *                   createdBy:
 *                     type: string
 *                     description: ID del usuario que creó el evento
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de creación del evento
 *       401:
 *         description: Token JWT inválido o faltante
 *       500:
 *         description: Error interno del servidor
 */
routes.get('/occurrences', isAuth, validateRequest, occurrencesController.list);

/**
 * @swagger
 * /api/occurrence/{id}:
 *   get:
 *     summary: Obtener un evento específico
 *     description: Obtiene los detalles de un evento específico por su ID
 *     tags: [Occurrence]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Evento obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID único del evento
 *                 name:
 *                   type: string
 *                   description: Nombre del evento
 *                 date:
 *                   type: string
 *                   format: date
 *                   description: Fecha del evento
 *                 location:
 *                   type: string
 *                   description: Ubicación del evento
 *                 capacity:
 *                   type: number
 *                   description: Capacidad máxima del evento
 *                 createdBy:
 *                   type: string
 *                   description: ID del usuario que creó el evento
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación del evento
 *       400:
 *         description: ID de evento inválido
 *       401:
 *         description: Token JWT inválido o faltante
 *       404:
 *         description: Evento no encontrado
 *       500:
 *         description: Error interno del servidor
 */
routes.get('/occurrence/:id', isAuth, occurrencesController.get);

/**
 * @swagger
 * /api/occurrence/{id}:
 *   put:
 *     summary: Actualizar un evento
 *     description: Permite al usuario autenticado actualizar un evento existente. Solo se pueden actualizar eventos futuros.
 *     tags: [Occurrence]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento a actualizar
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nuevo nombre del evento
 *                 example: "Conferencia de Tecnología Actualizada"
 *                 minLength: 1
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Nueva fecha del evento (debe ser futura)
 *                 example: "2024-12-26"
 *               location:
 *                 type: string
 *                 description: Nueva ubicación del evento
 *                 example: "Auditorio Principal"
 *                 minLength: 1
 *               capacity:
 *                 type: number
 *                 description: Nueva capacidad máxima del evento
 *                 example: 150
 *                 minimum: 0
 *     responses:
 *       200:
 *         description: Evento actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *                 location:
 *                   type: string
 *                 capacity:
 *                   type: number
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: Token JWT inválido o faltante
 *       403:
 *         description: Solo se pueden actualizar eventos futuros
 *       404:
 *         description: Evento no encontrado o no se pudo actualizar
 *       500:
 *         description: Error interno del servidor
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
 *     summary: Eliminar un evento
 *     description: Permite al usuario autenticado eliminar un evento existente
 *     tags: [Occurrence]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento a eliminar
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Evento eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OCCURRENCE_IS_DELETE"
 *       400:
 *         description: ID de evento inválido
 *       401:
 *         description: Token JWT inválido o faltante
 *       404:
 *         description: Evento no encontrado o no se pudo eliminar
 *       500:
 *         description: Error interno del servidor
 */
routes.delete('/occurrence/:id', isAuth, occurrencesController.delete);

export default routes;
