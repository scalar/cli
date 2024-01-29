"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clojure = void 0;
const client_js_1 = require("./clj_http/client.js");
exports.clojure = {
    info: {
        key: 'clojure',
        title: 'Clojure',
        extname: '.clj',
        default: 'clj_http',
    },
    clientsById: {
        clj_http: client_js_1.clj_http,
    },
};
