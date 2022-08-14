require('colors');
const fastify = require('fastify');
const config = require('../config');
const multer = require('fastify-multer')

const { Mongodb, Services, Routes, Authentication } = require('./plugins');
class Server {
  constructor() {
    this.fastify = fastify({
      logger: config.logger
    });
    
    this.fastify
      .decorate('config', config)
      .register(require('morgan')('dev'))
      .register(require('fastify-cors'))
      .register(require('fastify-helmet'))
      .register(require('fastify-swagger'), config.swagger)
      .register(require('fastify-boom'))
      .register(multer.contentParser)
      .register(Authentication)
      .register(Mongodb)
      .register(Services)
      .register(Routes);
  }

  async start() {
    await this.fastify.ready();

    await this.fastify.listen(config.web.port, '0.0.0.0', err => {
      if (err) {
        console.log('Error starting server:'.red, err);
        process.exit(1);
      }
      console.log(
        `Server start on Host: ${this.fastify.server.address().address}`.green
      );

      console.log(
        `Server start on Port: ${this.fastify.server.address().port}`.green
      );
    });
  }
}

module.exports = Server;
