"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.javascript = void 0;
const client_js_1 = require("./axios/client.js");
const client_js_2 = require("./fetch/client.js");
const client_js_3 = require("./jquery/client.js");
const client_js_4 = require("./xhr/client.js");
exports.javascript = {
    info: {
        key: 'javascript',
        title: 'JavaScript',
        extname: '.js',
        default: 'xhr',
    },
    clientsById: {
        xhr: client_js_4.xhr,
        axios: client_js_1.axios,
        fetch: client_js_2.fetch,
        jquery: client_js_3.jquery,
    },
};
