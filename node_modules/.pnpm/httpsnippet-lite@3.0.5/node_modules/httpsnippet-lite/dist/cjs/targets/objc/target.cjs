"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objc = void 0;
const client_js_1 = require("./nsurlsession/client.cjs");
exports.objc = {
    info: {
        key: 'objc',
        title: 'Objective-C',
        extname: '.m',
        default: 'nsurlsession',
    },
    clientsById: {
        nsurlsession: client_js_1.nsurlsession,
    },
};
