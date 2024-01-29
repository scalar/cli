"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.java = void 0;
const client_js_1 = require("./asynchttp/client.cjs");
const client_js_2 = require("./nethttp/client.cjs");
const client_js_3 = require("./okhttp/client.cjs");
const client_js_4 = require("./unirest/client.cjs");
exports.java = {
    info: {
        key: 'java',
        title: 'Java',
        extname: '.java',
        default: 'unirest',
    },
    clientsById: {
        asynchttp: client_js_1.asynchttp,
        nethttp: client_js_2.nethttp,
        okhttp: client_js_3.okhttp,
        unirest: client_js_4.unirest,
    },
};
