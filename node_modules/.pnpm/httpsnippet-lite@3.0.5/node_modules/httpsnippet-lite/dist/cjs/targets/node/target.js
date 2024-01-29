"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.node = void 0;
const client_js_1 = require("./axios/client.js");
const client_js_2 = require("./fetch/client.js");
const client_js_3 = require("./native/client.js");
const client_js_4 = require("./request/client.js");
const client_js_5 = require("./unirest/client.js");
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
