"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.php = void 0;
const client_js_1 = require("./curl/client.cjs");
const client_js_2 = require("./guzzle/client.cjs");
const client_js_3 = require("./http1/client.cjs");
const client_js_4 = require("./http2/client.cjs");
exports.php = {
    info: {
        key: 'php',
        title: 'PHP',
        extname: '.php',
        default: 'curl',
    },
    clientsById: {
        curl: client_js_1.curl,
        guzzle: client_js_2.guzzle,
        http1: client_js_3.http1,
        http2: client_js_4.http2,
    },
};
