import { RequestHandler } from 'express';

const jwt = require('jsonwebtoken');
const HttpError = require('../models/httpError');

const checkAuth: RequestHandler = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers?.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('Authentication failed.');
    }

    jwt.verify(token, process.env.JWT_KEY);
    next();
  } catch (err) {
    const error = new HttpError(
      'Authentication failed, try signing in again.',
      401,
      err,
      'small',
    );
    return next(error);
  }
};

module.exports = { checkAuth };
