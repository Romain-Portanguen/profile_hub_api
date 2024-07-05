import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const createUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  dateOfBirth: Joi.date().iso().required(),
  address: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  identityNumber: Joi.string().required(),
  identityType: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().valid('User', 'Admin', 'Owner').required(),
  profilePicture: Joi.string().uri().optional(),
});

const updateUserSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  email: Joi.string().email().optional(),
  dateOfBirth: Joi.date().iso().optional(),
  address: Joi.string().optional(),
  phoneNumber: Joi.string().optional(),
  identityNumber: Joi.string().optional(),
  identityType: Joi.string().optional(),
  password: Joi.string().optional(),
  role: Joi.string().valid('User', 'Admin', 'Owner').optional(),
  profilePicture: Joi.string().uri().optional(),
}).min(1);

const uuidSchema = Joi.string().uuid();

export const validateRequest = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

export const validateUUID = (req: Request, res: Response, next: NextFunction) => {
  const { error } = uuidSchema.validate(req.params.id);
  if (error) {
    return res.status(400).json({ error: 'Invalid UUID format' });
  }
  next();
};

export const validateCreateUser = validateRequest(createUserSchema);
export const validateUpdateUser = validateRequest(updateUserSchema);
