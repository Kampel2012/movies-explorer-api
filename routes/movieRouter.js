import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getAllMovies,
  addNewMovie,
  deleteMovieById,
} from '../controllers/moviesControllers.js';
import validationRegex from '../utils/constants.js';

const router = Router();

router.get('/', getAllMovies);

router.post(
  '/',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().length(24).hex(),
    }),
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.number().required(),
      description: Joi.string().required(),
      image: Joi.string().required().regex(validationRegex),
      trailerLink: Joi.string().required().regex(validationRegex),
      thumbnail: Joi.string().required().regex(validationRegex),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  addNewMovie,
);

router.delete(
  '/:movieId', //! может где-то встретиться неожиданно
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex(),
    }),
  }),
  deleteMovieById,
);

export default router;
