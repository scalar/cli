"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
const client_js_1 = require("./libcurl/client.js");
exports.c = {
    info: {
        key: 'c',
        title: 'C',
        extname: '.c',
        default: 'libcurl',
    },
    clientsById: {
        libcurl: client_js_1.libcurl,
    },
};
