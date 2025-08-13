import express from 'express';
import isAuth from '../middlewares/isAuth';
import { validateRequest } from '../middlewares/index';
import {
  loginValidators,
  createUserValidators,
  updateUserValidators,
  UserController,
} from '../controllers/UserController';
import isApikey from '../middlewares/isApiKey';

const routes = express.Router();
const userController = new UserController();

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new User
 *     tags: [Users]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     parameters:
 *       - in: header
 *         name: api-key
 *         required: true
 *         schema:
 *           type: string
 *         description: Client Api Key Authorization
 *     responses:
 *       200:
 *         description: Create a new User
 */
routes.post(
  '/user',
  isApikey,
  createUserValidators,
  validateRequest,
  userController.register,
);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User Login
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User Login
 */
routes.post('/login', loginValidators, validateRequest, userController.login);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
routes.get('/users', isAuth, validateRequest, userController.list);

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get a user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Get a user
 */
routes.get('/user', isAuth, userController.getProfile);

/**
 * @swagger
 * /api/users:
 *   put:
 *     summary: Update a User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update a User
 */
routes.put('/user', isAuth, updateUserValidators, userController.update);

/**
 * @swagger
 * /api/change-pass:
 *   put:
 *     summary: Change User Password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Change User Password
 */
routes.patch(
  '/change-pass',
  isAuth,
  updateUserValidators,
  userController.update,
);

/**
 * @swagger
 * /api/user:
 *   delete:
 *     summary: Update a User
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Update a User
 */
routes.delete('/user', isAuth, userController.delete);

export default routes;
