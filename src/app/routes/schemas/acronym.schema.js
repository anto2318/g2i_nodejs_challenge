const { baseGet, baseSearch, baseAdd, baseUpdate, baseRemove } = require('./base.schema');

const pagination = {
    total: { type: 'number' },
    limit: { type: 'number' },
    page: { type: 'number' },
    pages: { type: 'number' }
};

const acronymsBody = {
    acronym: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' }
};

const input = {
    acronym: { type: 'string' },
};

const bodySearch = {
    docs: {
        type: 'array',
        items: {
            type: 'object',
            properties: acronymsBody
        }
    },
};

const get = baseGet(acronymsBody);
const search = baseSearch(bodySearch);
const add = baseAdd(input, acronymsBody);
const update = baseUpdate(input, acronymsBody);
const remove = baseRemove({message: { type: 'string' }, acronymsBody});

module.exports = { get, search, add, update, remove, acronymsBody };