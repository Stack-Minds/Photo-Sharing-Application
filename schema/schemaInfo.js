"use strict";

const mongoose = require('mongoose');

const schemaInfo = new mongoose.Schema({
    version: String,
    load_date_time: {type: Date, default: Date.now},
},
{ versionKey: false });

const SchemaInfo = mongoose.model('SchemaInfo', schemaInfo);

module.exports = SchemaInfo;
