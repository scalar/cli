"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kotlin = void 0;
const client_js_1 = require("./okhttp/client.cjs");
exports.kotlin = {
    info: {
        key: 'kotlin',
        title: 'Kotlin',
        extname: '.kt',
        default: 'okhttp',
    },
    clientsById: {
        okhttp: client_js_1.okhttp,
    },
};
