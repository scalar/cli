"use strict";
/**
 * @description
 * HTTP code snippet generator for native XMLHttpRequest
 *
 * @author
 * @AhmadNassri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.xhr = void 0;
const stringify_object_1 = __importDefault(require("stringify-object"));
const code_builder_js_1 = require("../../../helpers/code-builder.js");
const escape_js_1 = require("../../../helpers/escape.js");
const headers_js_1 = require("../../../helpers/headers.js");
exports.xhr = {
    info: {
        key: 'xhr',
        title: 'XMLHttpRequest',
        link: 'https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest',
        description: 'W3C Standard API that provides scripted client functionality',
    },
    convert: ({ postData, allHeaders, method, fullUrl }, options) => {
        var _a;
        const opts = {
            indent: '  ',
            cors: true,
            ...options,
        };
        const { blank, push, join } = new code_builder_js_1.CodeBuilder({ indent: opts.indent });
        switch (postData === null || postData === void 0 ? void 0 : postData.mimeType) {
            case 'application/json':
                push(`const data = JSON.stringify(${(0, stringify_object_1.default)(postData.jsonObj, {
                    indent: opts.indent,
                })});`);
                blank();
                break;
            case 'multipart/form-data':
                if (!postData.params) {
                    break;
                }
                push('const data = new FormData();');
                postData.params.forEach(param => {
                    push(`data.append('${param.name}', '${param.value || param.fileName || ''}');`);
                });
                // remove the contentType header
                if ((0, headers_js_1.hasHeader)(allHeaders, 'content-type')) {
                    if ((_a = (0, headers_js_1.getHeader)(allHeaders, 'content-type')) === null || _a === void 0 ? void 0 : _a.includes('boundary')) {
                        const headerName = (0, headers_js_1.getHeaderName)(allHeaders, 'content-type');
                        if (headerName) {
                            delete allHeaders[headerName];
                        }
                    }
                }
                blank();
                break;
            default:
                push(`const data = ${(postData === null || postData === void 0 ? void 0 : postData.text) ? `'${postData.text}'` : 'null'};`);
                blank();
        }
        push('const xhr = new XMLHttpRequest();');
        if (opts.cors) {
            push('xhr.withCredentials = true;');
        }
        blank();
        push("xhr.addEventListener('readystatechange', function () {");
        push('if (this.readyState === this.DONE) {', 1);
        push('console.log(this.responseText);', 2);
        push('}', 1);
        push('});');
        blank();
        push(`xhr.open('${method}', '${fullUrl}');`);
        Object.keys(allHeaders).forEach(key => {
            push(`xhr.setRequestHeader('${key}', '${(0, escape_js_1.escapeForSingleQuotes)(allHeaders[key])}');`);
        });
        blank();
        push('xhr.send(data);');
        return join();
    },
};
