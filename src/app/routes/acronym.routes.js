const ctrl = require('../controllers/acronym.controller');
const {  get, search, add, update, remove } = require('./schemas/acronym.schema');

module.exports = async function(fastify) {
  fastify
  .get('/', { schema: search }, ctrl(fastify).search)
  .get('/:id', { schema: get }, ctrl(fastify).get)
  .post('/', { schema: add }, ctrl(fastify).add)
  .put('/:acronym', { schema: update, preValidation: [fastify.validate] }, ctrl(fastify).update)
  .delete('/:acronym', { schema: remove, preValidation: [fastify.validate] }, ctrl(fastify).delete);
};
