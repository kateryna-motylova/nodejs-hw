import { HttpError } from 'http-errors';
import { MulterError } from 'multer';

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      message: err.message,
    });
    return;
  }

  if (err instanceof MulterError) {
    res.status(400).json({
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    message: err.message,
  });
};
