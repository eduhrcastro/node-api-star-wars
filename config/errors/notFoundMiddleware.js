module.exports = (req, res, next) => {
  let response = {
    statusCode: 404,
    errorData: {
      errorCode: 'SRV-002',
      description: 'Route ' + req.url + ' is not found.'
    }
  }
  return res.status(404).send(response)
}
