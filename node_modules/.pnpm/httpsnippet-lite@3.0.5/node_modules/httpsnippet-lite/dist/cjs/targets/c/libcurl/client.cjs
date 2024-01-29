"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.libcurl = void 0;
const code_builder_js_1 = require("../../../helpers/code-builder.cjs");
const escape_js_1 = require("../../../helpers/escape.cjs");
exports.libcurl = {
    info: {
        key: 'libcurl',
        title: 'Libcurl',
        link: 'http://curl.haxx.se/libcurl',
        description: 'Simple REST and HTTP API Client for C',
    },
    convert: ({ method, fullUrl, headersObj, allHeaders, postData }) => {
        const { push, blank, join } = new code_builder_js_1.CodeBuilder();
        push('CURL *hnd = curl_easy_init();');
        blank();
        push(`curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "${method.toUpperCase()}");`);
        push(`curl_easy_setopt(hnd, CURLOPT_URL, "${fullUrl}");`);
        // Add headers, including the cookies
        const headers = Object.keys(headersObj);
        // construct headers
        if (headers.length) {
            blank();
            push('struct curl_slist *headers = NULL;');
            headers.forEach(header => {
                push(`headers = curl_slist_append(headers, "${header}: ${(0, escape_js_1.escapeForDoubleQuotes)(headersObj[header])}");`);
            });
            push('curl_easy_setopt(hnd, CURLOPT_HTTPHEADER, headers);');
        }
        // construct cookies
        if (allHeaders.cookie) {
            blank();
            push(`curl_easy_setopt(hnd, CURLOPT_COOKIE, "${allHeaders.cookie}");`);
        }
        if (postData === null || postData === void 0 ? void 0 : postData.text) {
            blank();
            push(`curl_easy_setopt(hnd, CURLOPT_POSTFIELDS, ${JSON.stringify(postData.text)});`);
        }
        blank();
        push('CURLcode ret = curl_easy_perform(hnd);');
        return join();
    },
};
