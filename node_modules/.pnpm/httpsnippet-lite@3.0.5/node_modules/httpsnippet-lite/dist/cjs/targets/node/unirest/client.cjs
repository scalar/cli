"use strict";
/**
 * @description
 * HTTP code snippet generator for Node.js using Unirest.
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
exports.unirest = void 0;
const stringify_object_1 = __importDefault(require("stringify-object"));
const code_builder_js_1 = require("../../../helpers/code-builder.cjs");
exports.unirest = {
    info: {
        key: 'unirest',
        title: 'Unirest',
        link: 'http://unirest.io/nodejs.html',
        description: 'Lightweight HTTP Request Client Library',
    },
    convert: ({ method, url, cookies, queryObj, postData, headersObj }, options) => {
        const opts = {
            indent: '  ',
            ...options,
        };
        let includeFS = false;
        const { addPostProcessor, blank, join, push, unshift } = new code_builder_js_1.CodeBuilder({
            indent: opts.indent,
        });
        push("const unirest = require('unirest');");
        blank();
        push(`const req = unirest('${method}', '${url}');`);
        blank();
        if (cookies.length) {
            push('const CookieJar = unirest.jar();');
            cookies.forEach(cookie => {
                push(`CookieJar.add('${encodeURIComponent(cookie.name)}=${encodeURIComponent(cookie.value)}', '${url}');`);
            });
            push('req.jar(CookieJar);');
            blank();
        }
        if (Object.keys(queryObj).length) {
            push(`req.query(${(0, stringify_object_1.default)(queryObj, { indent: opts.indent })});`);
            blank();
        }
        if (Object.keys(headersObj).length) {
            push(`req.headers(${(0, stringify_object_1.default)(headersObj, { indent: opts.indent })});`);
            blank();
        }
        switch (postData === null || postData === void 0 ? void 0 : postData.mimeType) {
            case 'application/x-www-form-urlencoded':
                if (postData.paramsObj) {
                    push(`req.form(${(0, stringify_object_1.default)(postData.paramsObj, { indent: opts.indent })});`);
                    blank();
                }
                break;
            case 'application/json':
                if (postData.jsonObj) {
                    push("req.type('json');");
                    push(`req.send(${(0, stringify_object_1.default)(postData.jsonObj, { indent: opts.indent })});`);
                    blank();
                }
                break;
            case 'multipart/form-data': {
                if (!postData.params) {
                    break;
                }
                const multipart = [];
                postData.params.forEach(param => {
                    const part = {};
                    if (param.fileName && !param.value) {
                        includeFS = true;
                        part.body = `fs.createReadStream('${param.fileName}')`;
                        addPostProcessor(code => code.replace(/'fs\.createReadStream\(\\'(.+)\\'\)'/, "fs.createReadStream('$1')"));
                    }
                    else if (param.value) {
                        part.body = param.value;
                    }
                    if (part.body) {
                        if (param.contentType) {
                            part['content-type'] = param.contentType;
                        }
                        multipart.push(part);
                    }
                });
                push(`req.multipart(${(0, stringify_object_1.default)(multipart, { indent: opts.indent })});`);
                blank();
                break;
            }
            default:
                if (postData === null || postData === void 0 ? void 0 : postData.text) {
                    push(`req.send(${(0, stringify_object_1.default)(postData.text, { indent: opts.indent })});`);
                    blank();
                }
        }
        if (includeFS) {
            unshift("const fs = require('fs');");
        }
        push('req.end(function (res) {');
        push('if (res.error) throw new Error(res.error);', 1);
        blank();
        push('console.log(res.body);', 1);
        push('});');
        return join();
    },
};
