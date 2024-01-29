"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csharp = void 0;
const client_js_1 = require("./httpclient/client.js");
const client_js_2 = require("./restsharp/client.js");
exports.csharp = {
    info: {
        key: 'csharp',
        title: 'C#',
        extname: '.cs',
        default: 'restsharp',
    },
    clientsById: {
        httpclient: client_js_1.httpclient,
        restsharp: client_js_2.restsharp,
    },
};
