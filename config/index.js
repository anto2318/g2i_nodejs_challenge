const artifactDetails = require('../ArtifactDetails.json');
const path = require('path');
const logPath = path.join(__dirname, '../logs/development.log');

module.exports = {
    web: {
        artifact: artifactDetails,
        name: artifactDetails.name,
        version: artifactDetails.version,
        port: process.env.PORT,
    },
    database: {
        url: process.env.MONGO_URL,
    },
    logger: {
        file: logPath,
        prettyPrint: {
            levelFirst: false,
            colorize: false,
            ignore: 'hostname',
            translateTime: 'yyyy-mm-dd HH:MM:ss',
        },
    },
    swagger: {
        routePrefix: '/docs',
        exposeRoute: true,
        swagger: {
            info: {
                title: 'g2i_nodejs_challenge',
                description: 'G2i Nodejs Challenge',
                version: '1.0.0',
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here',
            },
            host: `localhost:${process.env.SERVER_PORT}`,
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
        },
    },

    search: {
        pageOptions: {
            limit: 10,
            page: 1,
            sort: { createdAt: -1 },
        },
    },
};
