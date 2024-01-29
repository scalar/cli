"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swift = void 0;
const client_js_1 = require("./nsurlsession/client.js");
exports.swift = {
    info: {
        key: 'swift',
        title: 'Swift',
        extname: '.swift',
        default: 'nsurlsession',
    },
    clientsById: {
        nsurlsession: client_js_1.nsurlsession,
    },
};
