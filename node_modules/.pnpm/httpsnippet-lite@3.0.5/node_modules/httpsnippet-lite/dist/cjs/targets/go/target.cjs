"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.go = void 0;
const client_js_1 = require("./native/client.cjs");
exports.go = {
    info: {
        key: 'go',
        title: 'Go',
        extname: '.go',
        default: 'native',
    },
    clientsById: {
        native: client_js_1.native,
    },
};
