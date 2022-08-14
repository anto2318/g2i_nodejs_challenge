const { customQuery } = require('../utils');

const acronymController = (fastify) => {
    const { acronymService } = fastify;
    return {
        get: async (req, res) => {
            const result = await acronymService.get(req.params.id);
            res.send(result);
        },
        search: async (req, res) => {
            const query = customQuery(req.query);
            const result = await acronymService.search(query);
            res.send(result);
        },
        add: async (req, res) => {
            await acronymService.add(req.body);
            const query = customQuery(req.query);
            const result = await acronymService.search(query);
            res.send(result);
        },
        update: async (req, res) => {
            const result = await acronymService.update(req.url.split('acronym/')[1], req.body);
            res.send({result, msg: "Record updated successfully"});
        },
        delete: async (req, res) => {
            const result = await acronymService.delete(req.url.split('acronym/')[1], req.body);
            res.send({result, msg: "Record deleted successfully"});
        },
    };
};
module.exports = acronymController;
