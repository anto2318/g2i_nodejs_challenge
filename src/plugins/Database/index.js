const mongoose = require('mongoose');
const fp = require('fastify-plugin');

mongoose.set('bufferCommands', false);
mongoose.Promise = global.Promise;

module.exports = fp(async function mongodb(fastify) {
  try {

    const db = await mongoose.connect(fastify.config.database.url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    require('../../app/models');

    fastify.decorate('mongodb', db);

    console.log(
      `Database connected succesfully ==> ${fastify.config.database.url}\n`
        .green
    );
  } catch (error) {
    console.log(
      `Database cannot be connected: ${fastify.config.database.url} `.red
    );
    fastify.log.error(error);
  }
});