const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err

  // ? response consists of code and response message
  const response = {
    code: statusCode,
    message,
  }
  res.status(statusCode).json(response)
}

module.exports = errorHandler
