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
 *     summary: Crear un nuevo usuario
 *     description: Registra un nuevo usuario en el sistema. Requiere API key válida en el header.
 *     tags: [Users]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre completo del usuario
 *                 example: "Juan Pérez"
 *                 minLength: 1
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico único del usuario
 *                 example: "juan.perez@email.com"
 *               password:
 *                 type: string
 *                 description: Contraseña segura (mínimo 4 caracteres, debe ser fuerte)
 *                 example: "Contraseña123!"
 *                 minLength: 4
 *     parameters:
 *       - in: header
 *         name: api-key
 *         required: true
 *         schema:
 *           type: string
 *         description: Clave API del cliente para autorización
 *         example: "123456"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID único del usuario
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: API key inválida o faltante
 *       500:
 *         description: Error interno del servidor
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
 *     summary: Inicio de sesión de usuario
 *     description: Autentica a un usuario existente y devuelve un token JWT
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario
 *                 example: "juan.perez@email.com"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: "Contraseña123!"
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticación
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error interno del servidor
 */
routes.post('/login', loginValidators, validateRequest, userController.login);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Lista todos los usuarios registrados en el sistema. Requiere autenticación JWT.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID único del usuario
 *                   name:
 *                     type: string
 *                     description: Nombre del usuario
 *                   email:
 *                     type: string
 *                     description: Correo electrónico del usuario
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de creación del usuario
 *       401:
 *         description: Token JWT inválido o faltante
 *       500:
 *         description: Error interno del servidor
 */
routes.get('/users', isAuth, validateRequest, userController.list);

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Obtener perfil del usuario autenticado
 *     description: Obtiene la información del perfil del usuario actualmente autenticado
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Perfil del usuario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID único del usuario
 *                 name:
 *                   type: string
 *                   description: Nombre del usuario
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación del usuario
 *       401:
 *         description: Token JWT inválido o faltante
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
routes.get('/user', isAuth, userController.getProfile);

/**
 * @swagger
 * /api/users:
 *   put:
 *     summary: Actualizar perfil del usuario
 *     description: Actualiza la información del perfil del usuario autenticado
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
 *                 description: Nuevo nombre del usuario
 *                 example: "Juan Carlos Pérez"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Nuevo correo electrónico del usuario
 *                 example: "juan.carlos@email.com"
 *               password:
 *                 type: string
 *                 description: Nueva contraseña segura (opcional)
 *                 example: "NuevaContraseña123!"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: Token JWT inválido o faltante
 *       404:
 *         description: Usuario no encontrado o no se pudo actualizar
 *       500:
 *         description: Error interno del servidor
 */
routes.put('/user', isAuth, updateUserValidators, userController.update);

/**
 * @swagger
 * /api/change-pass:
 *   patch:
 *     summary: Cambiar contraseña del usuario
 *     description: Permite al usuario autenticado cambiar su contraseña
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 description: Nueva contraseña segura
 *                 example: "NuevaContraseña123!"
 *                 minLength: 4
 *     responses:
 *       200:
 *         description: Contraseña cambiada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contraseña actualizada"
 *       400:
 *         description: Contraseña inválida
 *       401:
 *         description: Token JWT inválido o faltante
 *       500:
 *         description: Error interno del servidor
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
 *     summary: Eliminar cuenta de usuario
 *     description: Permite al usuario autenticado eliminar su cuenta permanentemente
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "USER_DELETE"
 *       401:
 *         description: Token JWT inválido o faltante
 *       404:
 *         description: Usuario no encontrado o no se pudo eliminar
 *       500:
 *         description: Error interno del servidor
 */
routes.delete('/user', isAuth, userController.delete);

export default routes;
