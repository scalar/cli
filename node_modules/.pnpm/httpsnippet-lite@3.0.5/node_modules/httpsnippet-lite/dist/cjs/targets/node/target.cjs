"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.node = void 0;
const client_js_1 = require("./axios/client.cjs");
const client_js_2 = require("./fetch/client.cjs");
const client_js_3 = require("./native/client.cjs");
const client_js_4 = require("./request/client.cjs");
const client_js_5 = require("./unirest/client.cjs");
exports.node = {
    info: {
        key: 'node',
        title: 'Node.js',
        extname: '.js',
        default: 'native',
    },
    clientsById: {
        native: client_js_3.native,
        request: client_js_4.request,
        unirest: client_js_5.unirest,
        axios: client_js_1.axios,
        fetch: client_js_2.fetch,
    },
};
