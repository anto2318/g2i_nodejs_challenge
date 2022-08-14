const fp = require('fastify-plugin');
const { auth } = require('../../../config');
const jwt = require('jsonwebtoken');

module.exports = fp(async function Authentication(fastify) {
  fastify.register(require('fastify-jwt'), {
    secret: auth.secretKey
  });

  fastify.decorate('validate', async function(req, res) {
    const token = jwt.sign(req.headers.authorization.split(' ')[1], auth.secretKey);
    try {
      await jwt.verify(token,auth.secretKey);
    } catch (err) {
      res.send(err);
    }
  });
});
