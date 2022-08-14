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
            const result = await acronymService.update(req.params.id, req.body);
            res.send(result);
        },
        delete: async (req, res) => {
            try {
                await acronymService.delete(req.body);

                const query = customQuery(req.query);
                const result = await acronymService.search({
                    ...query,
                    logger: req.user.id,
                });

                res.send({ result, message: 'Deleted acronym successfully' });
            } catch (e) {
                res.send(e);
            }
        },
    };
};
module.exports = acronymController;
