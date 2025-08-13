import express from 'express';
import { body } from 'express-validator';
import isAuth from '../middlewares/isAuth';
import { validateRequest } from '../middlewares/index';
import {
  BookingController,
  createBookingValidators,
  updateBookingValidators,
} from '../controllers/BookingController';

const routes = express.Router();
const bookingController = new BookingController();

/**
 * @swagger
 * /api/booking:
 *   post:
 *     summary: Crear una nueva reserva
 *     description: Permite al usuario autenticado crear una reserva para un evento específico
 *     tags: [Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - occurrence
 *             properties:
 *               occurrence:
 *                 type: string
 *                 description: ID del evento para el cual se crea la reserva
 *                 example: "507f1f77bcf86cd799439011"
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID único de la reserva
 *                 user:
 *                   type: string
 *                   description: ID del usuario que creó la reserva
 *                 occurrence:
 *                   type: string
 *                   description: ID del evento reservado
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación de la reserva
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: Token JWT inválido o faltante
 *       500:
 *         description: Error interno del servidor
 */
routes.post(
  '/booking',
  isAuth,
  createBookingValidators,
  validateRequest,
  bookingController.create,
);

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Obtener todas las reservas
 *     description: Lista todas las reservas del usuario autenticado
 *     tags: [Booking]
 *     responses:
 *       200:
 *         description: Lista de reservas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID único de la reserva
 *                   user:
 *                     type: string
 *                     description: ID del usuario que creó la reserva
 *                   occurrence:
 *                     type: string
 *                     description: ID del evento reservado
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de creación de la reserva
 *       401:
 *         description: Token JWT inválido o faltante
 *       500:
 *         description: Error interno del servidor
 */
routes.get('/bookings', isAuth, validateRequest, bookingController.list);

/**
 * @swagger
 * /api/booking/{id}:
 *   get:
 *     summary: Obtener una reserva específica
 *     description: Obtiene los detalles de una reserva específica por su ID
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Reserva obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID único de la reserva
 *                 user:
 *                   type: string
 *                   description: ID del usuario que creó la reserva
 *                 occurrence:
 *                   type: string
 *                   description: ID del evento reservado
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación de la reserva
 *       400:
 *         description: ID de reserva inválido
 *       401:
 *         description: Token JWT inválido o faltante
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error interno del servidor
 */
routes.get('/booking/:id', isAuth, bookingController.get);

/**
 * @swagger
 * /api/booking/cancel:
 *   delete:
 *     summary: Cancelar una reserva
 *     description: Permite al usuario autenticado cancelar una reserva existente
 *     tags: [Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - occurrence
 *             properties:
 *               occurrence:
 *                 type: string
 *                 description: ID del evento de la reserva a cancelar
 *                 example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Reserva cancelada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID único de la reserva
 *                 user:
 *                   type: string
 *                   description: ID del usuario que canceló la reserva
 *                 occurrence:
 *                   type: string
 *                   description: ID del evento de la reserva cancelada
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de cancelación de la reserva
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: Token JWT inválido o faltante
 *       404:
 *         description: Reserva no encontrada o no se pudo cancelar
 *       500:
 *         description: Error interno del servidor
 */
routes.delete(
  '/booking/cancel',
  isAuth,
  updateBookingValidators,
  bookingController.update,
);

export default routes;
