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
exports.http1 = void 0;
const code_builder_js_1 = require("../../../helpers/code-builder.js");
const helpers_js_1 = require("../helpers.js");
exports.http1 = {
    info: {
        key: 'http1',
        title: 'HTTP v1',
        link: 'http://php.net/manual/en/book.http.php',
        description: 'PHP with pecl/http v1',
    },
    convert: ({ method, url, postData, queryObj, headersObj, cookiesObj }, options = {}) => {
        const { closingTag = false, indent = '  ', noTags = false, shortTags = false } = options;
        const { push, blank, join } = new code_builder_js_1.CodeBuilder({ indent });
        if (!noTags) {
            push(shortTags ? '<?' : '<?php');
            blank();
        }
        if (!helpers_js_1.supportedMethods.includes(method.toUpperCase())) {
            push(`HttpRequest::methodRegister('${method}');`);
        }
        push('$request = new HttpRequest();');
        push(`$request->setUrl(${(0, helpers_js_1.convertType)(url)});`);
        if (helpers_js_1.supportedMethods.includes(method.toUpperCase())) {
            push(`$request->setMethod(HTTP_METH_${method.toUpperCase()});`);
        }
        else {
            push(`$request->setMethod(HttpRequest::HTTP_METH_${method.toUpperCase()});`);
        }
        blank();
        if (Object.keys(queryObj).length) {
            push(`$request->setQueryData(${(0, helpers_js_1.convertType)(queryObj, indent)});`);
            blank();
        }
        if (Object.keys(headersObj).length) {
            push(`$request->setHeaders(${(0, helpers_js_1.convertType)(headersObj, indent)});`);
            blank();
        }
        if (Object.keys(cookiesObj).length) {
            push(`$request->setCookies(${(0, helpers_js_1.convertType)(cookiesObj, indent)});`);
            blank();
        }
        switch (postData === null || postData === void 0 ? void 0 : postData.mimeType) {
            case 'application/x-www-form-urlencoded':
                push(`$request->setContentType(${(0, helpers_js_1.convertType)(postData.mimeType)});`);
                push(`$request->setPostFields(${(0, helpers_js_1.convertType)(postData.paramsObj, indent)});`);
                blank();
                break;
            case 'application/json':
                push(`$request->setContentType(${(0, helpers_js_1.convertType)(postData.mimeType)});`);
                push(`$request->setBody(json_encode(${(0, helpers_js_1.convertType)(postData.jsonObj, indent)}));`);
                blank();
                break;
            default:
                if (postData === null || postData === void 0 ? void 0 : postData.text) {
                    push(`$request->setBody(${(0, helpers_js_1.convertType)(postData.text)});`);
                    blank();
                }
        }
        push('try {');
        push('$response = $request->send();', 1);
        blank();
        push('echo $response->getBody();', 1);
        push('} catch (HttpException $ex) {');
        push('echo $ex;', 1);
        push('}');
        if (!noTags && closingTag) {
            blank();
            push('?>');
        }
        return join();
    },
};
