export const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  res.status(500).json({ errorMessage: 'A server error has occured.' });
  return console.error(err);
};
