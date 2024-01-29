"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportedMethods = exports.convertType = void 0;
const escape_js_1 = require("../../helpers/escape.js");
const convertType = (obj, indent, lastIndent) => {
    lastIndent = lastIndent || '';
    indent = indent || '';
    switch (Object.prototype.toString.call(obj)) {
        case '[object Null]':
            return 'null';
        case '[object Undefined]':
            return 'null';
        case '[object String]':
            return `'${(0, escape_js_1.escapeString)(obj, { delimiter: "'", escapeNewlines: false })}'`;
        case '[object Number]':
            return obj.toString();
        case '[object Array]': {
            const contents = obj
                .map((item) => (0, exports.convertType)(item, `${indent}${indent}`, indent))
                .join(`,\n${indent}`);
            return `[\n${indent}${contents}\n${lastIndent}]`;
        }
        case '[object Object]': {
            const result = [];
            for (const i in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, i)) {
                    result.push(`${(0, exports.convertType)(i, indent)} => ${(0, exports.convertType)(obj[i], `${indent}${indent}`, indent)}`);
                }
            }
            return `[\n${indent}${result.join(`,\n${indent}`)}\n${lastIndent}]`;
        }
        default:
            return 'null';
    }
};
exports.convertType = convertType;
exports.supportedMethods = [
    'ACL',
    'BASELINE_CONTROL',
    'CHECKIN',
    'CHECKOUT',
    'CONNECT',
    'COPY',
    'DELETE',
    'GET',
    'HEAD',
    'LABEL',
    'LOCK',
    'MERGE',
    'MKACTIVITY',
    'MKCOL',
    'MKWORKSPACE',
    'MOVE',
    'OPTIONS',
    'POST',
    'PROPFIND',
    'PROPPATCH',
    'PUT',
    'REPORT',
    'TRACE',
    'UNCHECKOUT',
    'UNLOCK',
    'UPDATE',
    'VERSION_CONTROL',
];
