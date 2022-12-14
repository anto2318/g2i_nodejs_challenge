exports.objectToDotNotation = (args) => {
    const setObject = {};
    Object.keys(args).forEach((key) => {
        if (typeof args[key] === 'object' && !Array.isArray(args[key])) {
            Object.keys(args[key]).forEach((subkey) => {
                setObject[`${key}.${subkey}`] = args[key][subkey];
            });
        } else {
            setObject[key] = args[key];
        }
    });
    return setObject;
};

exports.customQuery = (query) => {
    const {
        select,
        populate,
        page,
        limit,
        from,
        sortField,
        sortDirection,

        ...queryParams
    } = query;

    return {
        select,
        populate,
        page: Number(page),
        from: Number(from),
        limit: Number(limit),
        sortField,
        sortDirection,
        queryParams,
    };
};
