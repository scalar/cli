"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.http = void 0;
const client_js_1 = require("./http1.1/client.cjs");
exports.http = {
    info: {
        key: 'http',
        title: 'HTTP',
        extname: null,
        default: '1.1',
    },
    clientsById: {
        'http1.1': client_js_1.http11,
    },
};
