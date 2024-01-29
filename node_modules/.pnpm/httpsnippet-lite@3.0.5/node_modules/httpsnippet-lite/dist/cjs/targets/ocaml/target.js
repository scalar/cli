"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ocaml = void 0;
const client_js_1 = require("./cohttp/client.js");
exports.ocaml = {
    info: {
        key: 'ocaml',
        title: 'OCaml',
        extname: '.ml',
        default: 'cohttp',
    },
    clientsById: {
        cohttp: client_js_1.cohttp,
    },
};
