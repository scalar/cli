"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.r = void 0;
const client_js_1 = require("./httr/client.cjs");
exports.r = {
    info: {
        key: 'r',
        title: 'R',
        extname: '.r',
        default: 'httr',
    },
    clientsById: {
        httr: client_js_1.httr,
    },
};
