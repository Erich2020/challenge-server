import {
  createOccurrence,
  getOccurrenceById,
  getAllOccurrences,
  updateOccurrence,
  deleteOccurrence,
} from '../services/occurrence';
import { body } from 'express-validator';
import { isFutureDate } from '../utils';

export const createOccurrenceValidators = [
  body('name').notEmpty().isString().withMessage('INVALID_NAME'),
  body('date').notEmpty().isDate().withMessage('INVALID_DATE'),
  body('location').notEmpty().isString().withMessage('INVALID_LOCATION'),
  body('capacity')
    .notEmpty()
    .isNumeric()
    .matches(/^(0|[1-9]\d*)$/)
    .withMessage('INVALID_CAPACITY'),
];

export const updateOccurrenceValidators = [
  body('name').optional().isString().withMessage('INVALID_NAME'),
  body('date')
    .optional()
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage('INVALID_DATE'),
  body('location').optional().isString().withMessage('INVALID_LOCATION'),
  body('capacity')
    .optional()
    .isNumeric()
    .matches(/^(0|[1-9]\d*)$/)
    .withMessage('INVALID_CAPACITY'),
];

export class OccurrencesController {
  async create(req: any, res: any) {
    try {
      if (!isFutureDate(req.body.date))
        return res.status(403).json({ error: 'INVALID_DATE_NOT_FUTURE_DATE' });

      const userId = req.user.id;
      const occurrence = await createOccurrence(req.body, userId);
      return res.status(201).json(occurrence);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async get(req: any, res: any) {
    try {
      console.log(req.params);
      const occurrence = await getOccurrenceById(req.params.id);
      if (!occurrence)
        return res.status(404).json({ error: 'OCCURRENCE_NOT_FOUND' });
      return res.json(occurrence);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async list(req: any, res: any) {
    try {
      const occurrences = await getAllOccurrences();
      return res.json(occurrences);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req: any, res: any) {
    try {
      const userId = req.user.id;

      if (isFutureDate(req.body.date))
        return res.status(403).json({ error: 'INVALID_DATE_NOT_FUTURE_DATE' });

      const occurrence = await updateOccurrence(
        req.params.id,
        req.body,
        userId,
      );
      if (!occurrence)
        return res.status(404).json({ error: 'OCCURRENCE_DONT_UPDATE' });
      return res.json(occurrence);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async delete(req: any, res: any) {
    try {
      const userId = req.user.id;
      const occurrence = await deleteOccurrence(req.params.id, userId);
      if (!occurrence)
        return res.status(404).json({ error: 'OCCURRENCE_DONT_DELETE' });
      return res.json({ message: 'OCCURRENCE_IS_DELETE' });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
