"use strict";
/**
 * @description
 * HTTP code snippet generator for PHP using Guzzle.
 *
 * @author @RobertoArruda
 * @author @erunion
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.guzzle = void 0;
const code_builder_js_1 = require("../../../helpers/code-builder.cjs");
const escape_js_1 = require("../../../helpers/escape.cjs");
const headers_js_1 = require("../../../helpers/headers.cjs");
const helpers_js_1 = require("../helpers.cjs");
exports.guzzle = {
    info: {
        key: 'guzzle',
        title: 'Guzzle',
        link: 'http://docs.guzzlephp.org/en/stable/',
        description: 'PHP with Guzzle',
    },
    convert: ({ postData, fullUrl, method, cookies, headersObj }, options) => {
        var _a;
        const opts = {
            closingTag: false,
            indent: '  ',
            noTags: false,
            shortTags: false,
            ...options,
        };
        const { push, blank, join } = new code_builder_js_1.CodeBuilder({ indent: opts.indent });
        const { code: requestCode, push: requestPush, join: requestJoin, } = new code_builder_js_1.CodeBuilder({ indent: opts.indent });
        if (!opts.noTags) {
            push(opts.shortTags ? '<?' : '<?php');
            blank();
        }
        switch (postData === null || postData === void 0 ? void 0 : postData.mimeType) {
            case 'application/x-www-form-urlencoded':
                requestPush(`'form_params' => ${(0, helpers_js_1.convertType)(postData.paramsObj, opts.indent + opts.indent, opts.indent)},`, 1);
                break;
            case 'multipart/form-data': {
                const fields = [];
                if (postData.params) {
                    postData.params.forEach(function (param) {
                        if (param.fileName) {
                            const field = {
                                name: param.name,
                                filename: param.fileName,
                                contents: param.value,
                            };
                            if (param.contentType) {
                                field.headers = { 'Content-Type': param.contentType };
                            }
                            fields.push(field);
                        }
                        else if (param.value) {
                            fields.push({
                                name: param.name,
                                contents: param.value,
                            });
                        }
                    });
                }
                if (fields.length) {
                    requestPush(`'multipart' => ${(0, helpers_js_1.convertType)(fields, opts.indent + opts.indent, opts.indent)}`, 1);
                    // Guzzle adds its own boundary for multipart requests.
                    if ((0, headers_js_1.hasHeader)(headersObj, 'content-type')) {
                        if ((_a = (0, headers_js_1.getHeader)(headersObj, 'content-type')) === null || _a === void 0 ? void 0 : _a.indexOf('boundary')) {
                            const headerName = (0, headers_js_1.getHeaderName)(headersObj, 'content-type');
                            if (headerName) {
                                delete headersObj[headerName];
                            }
                        }
                    }
                }
                break;
            }
            default:
                if (postData === null || postData === void 0 ? void 0 : postData.text) {
                    requestPush(`'body' => ${(0, helpers_js_1.convertType)(postData.text)},`, 1);
                }
        }
        // construct headers
        const headers = Object.keys(headersObj)
            .sort()
            .map(function (key) {
            return `${opts.indent}${opts.indent}'${key}' => '${(0, escape_js_1.escapeForSingleQuotes)(headersObj[key])}',`;
        });
        // construct cookies
        const cookieString = cookies
            .map(cookie => `${encodeURIComponent(cookie.name)}=${encodeURIComponent(cookie.value)}`)
            .join('; ');
        if (cookieString.length) {
            headers.push(`${opts.indent}${opts.indent}'cookie' => '${(0, escape_js_1.escapeForSingleQuotes)(cookieString)}',`);
        }
        if (headers.length) {
            requestPush("'headers' => [", 1);
            requestPush(headers.join('\n'));
            requestPush('],', 1);
        }
        push('$client = new \\GuzzleHttp\\Client();');
        blank();
        if (requestCode.length) {
            push(`$response = $client->request('${method}', '${fullUrl}', [`);
            push(requestJoin());
            push(']);');
        }
        else {
            push(`$response = $client->request('${method}', '${fullUrl}');`);
        }
        blank();
        push('echo $response->getBody();');
        if (!opts.noTags && opts.closingTag) {
            blank();
            push('?>');
        }
        return join();
    },
};
