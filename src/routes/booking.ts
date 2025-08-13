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
 *     summary: Create a new booking
 *     tags: [Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               occurrence:
 *                 type: string
 *     responses:
 *       200:
 *         description: Create a new booking
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
 *     summary: Get all booking
 *     tags: [Booking]
 *     responses:
 *       200:
 *         description: List of booking
 */
routes.get('/bookings', isAuth, validateRequest, bookingController.list);

/**
 * @swagger
 * /api/booking/{id}:
 *   get:
 *     summary: Get a booking
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: booking id
 *     responses:
 *       200:
 *         description: Get a booking
 */
routes.get('/booking/:id', isAuth, bookingController.get);

/**
 * @swagger
 * /api/booking/cancel:
 *   delete:
 *     summary: Update a booking
 *     tags: [Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               occurrence:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update a booking
 */
routes.delete(
  '/booking/cancel',
  isAuth,
  updateBookingValidators,
  bookingController.update,
);

export default routes;
