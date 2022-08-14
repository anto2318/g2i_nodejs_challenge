const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const AcronymSchema = new mongoose.Schema({
    acronym:{
        type: Map,
        of: String,
    },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }
}, 
{ versionKey: false,
    minimize: false,
    strict: true
});

AcronymSchema.index({ acronym: 1 });
AcronymSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('acronyms', AcronymSchema);