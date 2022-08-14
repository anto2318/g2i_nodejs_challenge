const ctrl = require('../controllers/acronym.controller');
const {  get, search, add, update, remove } = require('./schemas/acronym.schema');

module.exports = async function(fastify) {
  fastify
  .get('/', { schema: search }, ctrl(fastify).search)
  .get('/:id', { schema: get }, ctrl(fastify).get)
  .post('/', { schema: add }, ctrl(fastify).add)
  .put('/:id', { schema: update }, ctrl(fastify).update)
  .delete('/', { schema: remove }, ctrl(fastify).delete);
};
