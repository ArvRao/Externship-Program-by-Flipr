const validPassword = (password) =>
  password.match(/\d/) && password.length > 7 && password.match(/[a-zA-Z]/)

module.exports = { validPassword }
