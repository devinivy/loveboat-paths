'use strict';

const Joi = require('joi');

module.exports = {
    name: 'loveboat-paths',
    root: 'path',
    handler: (path) => path,
    match: Joi.array()
};
