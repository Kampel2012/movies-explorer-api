import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { updateUser, getUserInfo } from '../controllers/usersControllers.js';

const router = Router();

router.get(
  '/me',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().length(24).hex(),
    }),
  }),
  getUserInfo,
);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().min(2).max(30),
    }),
  }),
  updateUser,
);

export default router;
