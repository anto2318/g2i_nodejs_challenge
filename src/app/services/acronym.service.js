const mongoose = require('mongoose');
const { deepParseJson } = require('deep-parse-json');
const { search } = require('../../../config');
const { objectToDotNotation } = require('../utils');

class AcronymService {
    constructor(db) {
        this.Model = db.models.acronyms;
    }

    async search({
        select,
        populate,
        page,
        limit,
        sortField,
        sortDirection,
        querySearch,
        queryParams,
    }) {

        const options = {
            select: select || '',
            populate: populate,
            page: page || search.pageOptions.page,
            limit: limit || search.pageOptions.limit,
            lean: true,
            sort: sortField
                ? { [sortField]: sortDirection || search.pageOptions.sort.key }
                : search.pageOptions.sort,
        };

        const queryObject = querySearch
            ? deepParseJson(querySearch)
            : deepParseJson(queryParams);

        return this.Model.paginate({ ...queryObject }, options);
    }

    async get(id) {
        const obtained = await this.Model.findOne({ _id: id });
        return obtained;
    }

    async add(data) {
        const object = await this.Model.create(data);

        return object;
    }

    async delete(acronym) {
        const query = acronym[`${acronym}`];
        const deleted = await this.Model.findOneAndDelete(
            { query }
        )
        .catch((e) => {
            throw e;
        });

        return deleted;
    }

    async update(acronym, data) {
        const updated = await this.Model.findOneAndUpdate(
            { acronym: acronym },
            { $set: objectToDotNotation({ updatedAt: Date.now(), ...data }) },
            { new: true }
        )
        .catch((e) => {
            throw e;
        });

        return updated;
    }

}

module.exports = AcronymService;