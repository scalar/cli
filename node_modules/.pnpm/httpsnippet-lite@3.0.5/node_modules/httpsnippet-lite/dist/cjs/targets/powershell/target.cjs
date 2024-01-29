"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.powershell = void 0;
const client_js_1 = require("./restmethod/client.cjs");
const client_js_2 = require("./webrequest/client.cjs");
exports.powershell = {
    info: {
        key: 'powershell',
        title: 'Powershell',
        extname: '.ps1',
        default: 'webrequest',
    },
    clientsById: {
        webrequest: client_js_2.webrequest,
        restmethod: client_js_1.restmethod,
    },
};
