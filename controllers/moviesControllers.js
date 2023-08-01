import { constants as http2Constants } from 'node:http2';
import mongoose from 'mongoose';
import Movie from '../models/movieModel.js';
import {
  BadRequestError,
  NotFoundError,
  ValidationError,
  ForbiddenError,
} from '../errors/errors.js';

function errorHandler(error, res, next) {
  if (error instanceof mongoose.Error.ValidationError) {
    next(new ValidationError('Неправильно заполнены поля'));
  }

  if (error instanceof mongoose.Error.DocumentNotFoundError) {
    next(new NotFoundError('Запрашиваемая карточка не найдена'));
  }

  if (error instanceof mongoose.Error.CastError) {
    next(new BadRequestError('Некорректный id'));
  }

  next(error);
}

export const getAllMovies = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const movies = await Movie.find({ owner: _id }).populate('owner');
    res.status(http2Constants.HTTP_STATUS_OK).send(movies);
  } catch (error) {
    errorHandler(error, res, next);
  }
};

export const deleteMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId).orFail();
    if (movie.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Недостаточно прав для данного действия');
    }
    await Movie.deleteOne(movie).orFail();
    res
      .status(http2Constants.HTTP_STATUS_OK)
      .send({ message: 'Успешно удалено!' });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

export const addNewMovie = async ({ user, body }, res, next) => {
  try {
    const { _id } = user;
    const movie = await Movie.create({
      ...body,
      owner: _id,
    });

    res.status(http2Constants.HTTP_STATUS_CREATED).send(movie);
  } catch (error) {
    errorHandler(error, res, next);
  }
};
