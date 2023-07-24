import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { updateUser, getUserInfo } from '../controllers/usersControllers.js';

const router = Router();

router.get('/me', getUserInfo);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string(),
      email: Joi.string(),
    }),
  }),
  updateUser,
);

export default router;
