"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shell = void 0;
const client_js_1 = require("./curl/client.cjs");
const client_js_2 = require("./httpie/client.cjs");
const client_js_3 = require("./wget/client.cjs");
exports.shell = {
    info: {
        key: 'shell',
        title: 'Shell',
        extname: '.sh',
        default: 'curl',
    },
    clientsById: {
        curl: client_js_1.curl,
        httpie: client_js_2.httpie,
        wget: client_js_3.wget,
    },
};
