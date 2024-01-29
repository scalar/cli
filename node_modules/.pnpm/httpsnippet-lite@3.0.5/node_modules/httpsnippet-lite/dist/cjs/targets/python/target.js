"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.python = void 0;
const client_js_1 = require("./python3/client.js");
const client_js_2 = require("./requests/client.js");
exports.python = {
    info: {
        key: 'python',
        title: 'Python',
        extname: '.py',
        default: 'python3',
    },
    clientsById: {
        python3: client_js_1.python3,
        requests: client_js_2.requests,
    },
};
