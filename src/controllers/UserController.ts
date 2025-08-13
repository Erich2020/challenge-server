import {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  loginUser,
} from '../services/user';
import { body, param } from 'express-validator';

export const createUserValidators = [
  body('email').isEmail().withMessage('INVALID_EMAIL'),
  body('name').notEmpty().isString().withMessage('INVALID_UASERNAME'),
  body('password')
    .notEmpty()
    .isStrongPassword()
    .isLength({ min: 4 })
    .withMessage('INVALID_PASSWORD'),
];

export const updateUserValidators = [
  body('email').optional().isEmail().withMessage('INVALID_EMAIL'),
  body('name').optional().isString().withMessage('INVALID_UASERNAME'),
  body('password')
    .optional()
    .isStrongPassword()
    .withMessage('INVALID_PASSWORD'),
];

export const loginValidators = [
  body('email').isEmail().withMessage('INVALID_CREDENTIAL'),
  body('password').isString().withMessage('INVALID_CREDENTIAL'),
];

export const userIdValidators = [
  param('id').notEmpty().withMessage('INVALID_ID'),
];

export class UserController {
  async register(req: any, res: any) {
    try {
      const user = await createUser(req.body);
      return res.status(201).json(user);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  async login(req: any, res: any) {
    try {
      const { email, password } = req.body;
      const user = await loginUser(email, password);
      if (!user) return res.status(401).json({ error: 'INVALID_CREDENTIALS' });
      return res.json(user);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async getProfile(req: any, res: any) {
    try {
      const user = await getUserById(req.user.id);
      if (!user) return res.status(404).json({ error: 'USER_NOT_FOUND' });
      return res.json(user);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  async list(req: any, res: any) {
    try {
      const users = await getAllUsers();
      return res.json(users);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  async update(req: any, res: any) {
    try {
      const user = await updateUser(req.user.id, req.body);
      if (!user) return res.status(404).json({ error: 'USER_DONT_UPDATE' });
      return res.json(user);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  async delete(req: any, res: any) {
    try {
      const user = await deleteUser(req.user.id);
      if (!user) return res.status(404).json({ error: 'USER_DONT_DELETE' });
      return res.json({ message: 'USER_DELETE' });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}
