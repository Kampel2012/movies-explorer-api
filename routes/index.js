import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { login, addNewUser } from '../controllers/usersControllers.js';
import auth from '../middlewares/auth.js';
import userRouter from './usersRoutes.js';
import movieRouter from './movieRouter.js';
import NotFoundError from '../errors/NotFoundError.js';

const router = Router();

router.use(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
router.use(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  addNewUser,
);

router.use(auth)

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', () => {
  throw new NotFoundError('Данная страница не найдена');
});

export default router;
