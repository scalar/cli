"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ruby = void 0;
const client_js_1 = require("./native/client.cjs");
exports.ruby = {
    info: {
        key: 'ruby',
        title: 'Ruby',
        extname: '.rb',
        default: 'native',
    },
    clientsById: {
        native: client_js_1.native,
    },
};
