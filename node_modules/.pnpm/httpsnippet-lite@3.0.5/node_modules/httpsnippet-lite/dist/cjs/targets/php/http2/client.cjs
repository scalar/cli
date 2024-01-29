"use strict";
/**
 * @description
 * HTTP code snippet generator for PHP using curl-ext.
 *
 * @author
 * @AhmadNassri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.http2 = void 0;
const code_builder_js_1 = require("../../../helpers/code-builder.cjs");
const headers_js_1 = require("../../../helpers/headers.cjs");
const helpers_js_1 = require("../helpers.cjs");
exports.http2 = {
    info: {
        key: 'http2',
        title: 'HTTP v2',
        link: 'http://devel-m6w6.rhcloud.com/mdref/http',
        description: 'PHP with pecl/http v2',
    },
    convert: ({ postData, headersObj, method, queryObj, cookiesObj, url }, options = {}) => {
        var _a;
        const { closingTag = false, indent = '  ', noTags = false, shortTags = false } = options;
        const { push, blank, join } = new code_builder_js_1.CodeBuilder({ indent });
        let hasBody = false;
        if (!noTags) {
            push(shortTags ? '<?' : '<?php');
            blank();
        }
        push('$client = new http\\Client;');
        push('$request = new http\\Client\\Request;');
        blank();
        switch (postData === null || postData === void 0 ? void 0 : postData.mimeType) {
            case 'application/x-www-form-urlencoded':
                push('$body = new http\\Message\\Body;');
                push(`$body->append(new http\\QueryString(${(0, helpers_js_1.convertType)(postData.paramsObj, indent)}));`);
                blank();
                hasBody = true;
                break;
            case 'multipart/form-data': {
                if (!postData.params) {
                    break;
                }
                const files = [];
                const fields = {};
                postData.params.forEach(({ name, fileName, value, contentType }) => {
                    if (fileName) {
                        files.push({
                            name,
                            type: contentType,
                            file: fileName,
                            data: value,
                        });
                        return;
                    }
                    if (value) {
                        fields[name] = value;
                    }
                });
                const field = Object.keys(fields).length ? (0, helpers_js_1.convertType)(fields, indent) : 'null';
                const formValue = files.length ? (0, helpers_js_1.convertType)(files, indent) : 'null';
                push('$body = new http\\Message\\Body;');
                push(`$body->addForm(${field}, ${formValue});`);
                // remove the contentType header
                if ((0, headers_js_1.hasHeader)(headersObj, 'content-type')) {
                    if ((_a = (0, headers_js_1.getHeader)(headersObj, 'content-type')) === null || _a === void 0 ? void 0 : _a.indexOf('boundary')) {
                        const headerName = (0, headers_js_1.getHeaderName)(headersObj, 'content-type');
                        if (headerName) {
                            delete headersObj[headerName];
                        }
                    }
                }
                blank();
                hasBody = true;
                break;
            }
            case 'application/json':
                push('$body = new http\\Message\\Body;');
                push(`$body->append(json_encode(${(0, helpers_js_1.convertType)(postData.jsonObj, indent)}));`);
                hasBody = true;
                break;
            default:
                if (postData === null || postData === void 0 ? void 0 : postData.text) {
                    push('$body = new http\\Message\\Body;');
                    push(`$body->append(${(0, helpers_js_1.convertType)(postData.text)});`);
                    blank();
                    hasBody = true;
                }
        }
        push(`$request->setRequestUrl(${(0, helpers_js_1.convertType)(url)});`);
        push(`$request->setRequestMethod(${(0, helpers_js_1.convertType)(method)});`);
        if (hasBody) {
            push('$request->setBody($body);');
            blank();
        }
        if (Object.keys(queryObj).length) {
            push(`$request->setQuery(new http\\QueryString(${(0, helpers_js_1.convertType)(queryObj, indent)}));`);
            blank();
        }
        if (Object.keys(headersObj).length) {
            push(`$request->setHeaders(${(0, helpers_js_1.convertType)(headersObj, indent)});`);
            blank();
        }
        if (Object.keys(cookiesObj).length) {
            blank();
            push(`$client->setCookies(${(0, helpers_js_1.convertType)(cookiesObj, indent)});`);
            blank();
        }
        push('$client->enqueue($request)->send();');
        push('$response = $client->getResponse();');
        blank();
        push('echo $response->getBody();');
        if (!noTags && closingTag) {
            blank();
            push('?>');
        }
        return join();
    },
};
