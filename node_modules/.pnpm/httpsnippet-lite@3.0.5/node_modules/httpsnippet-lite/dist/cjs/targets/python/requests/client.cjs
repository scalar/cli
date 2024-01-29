"use strict";
/**
 * @description
 * HTTP code snippet generator for Python using Requests
 *
 * @author
 * @montanaflynn
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.requests = void 0;
const code_builder_js_1 = require("../../../helpers/code-builder.cjs");
const escape_js_1 = require("../../../helpers/escape.cjs");
const headers_js_1 = require("../../../helpers/headers.cjs");
const helpers_js_1 = require("../helpers.cjs");
const builtInMethods = ['HEAD', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];
exports.requests = {
    info: {
        key: 'requests',
        title: 'Requests',
        link: 'http://docs.python-requests.org/en/latest/api/#requests.request',
        description: 'Requests HTTP library',
    },
    convert: ({ queryObj, url, postData, allHeaders, method }, options) => {
        const opts = {
            indent: '    ',
            pretty: true,
            ...options,
        };
        // Start snippet
        const { push, blank, join } = new code_builder_js_1.CodeBuilder({ indent: opts.indent });
        // Import requests
        push('import requests');
        blank();
        // Set URL
        push(`url = "${url}"`);
        blank();
        // Construct query string
        let qs;
        if (Object.keys(queryObj).length) {
            qs = `querystring = ${JSON.stringify(queryObj)}`;
            push(qs);
            blank();
        }
        const headers = allHeaders;
        // Construct payload
        let payload = {};
        const files = {};
        let hasFiles = false;
        let hasPayload = false;
        let jsonPayload = false;
        switch (postData === null || postData === void 0 ? void 0 : postData.mimeType) {
            case 'application/json':
                if (postData.jsonObj) {
                    push(`payload = ${(0, helpers_js_1.literalRepresentation)(postData.jsonObj, opts)}`);
                    jsonPayload = true;
                    hasPayload = true;
                }
                break;
            case 'multipart/form-data':
                if (!postData.params) {
                    break;
                }
                payload = {};
                postData.params.forEach(p => {
                    if (p.fileName) {
                        files[p.name] = `open('${p.fileName}', 'rb')`;
                        hasFiles = true;
                    }
                    else {
                        payload[p.name] = p.value;
                        hasPayload = true;
                    }
                });
                if (hasFiles) {
                    push(`files = ${(0, helpers_js_1.literalRepresentation)(files, opts)}`);
                    if (hasPayload) {
                        push(`payload = ${(0, helpers_js_1.literalRepresentation)(payload, opts)}`);
                    }
                    // The requests library will only automatically add a `multipart/form-data` header if there are files being sent. If we're **only** sending form data we still need to send the boundary ourselves.
                    const headerName = (0, headers_js_1.getHeaderName)(headers, 'content-type');
                    if (headerName) {
                        delete headers[headerName];
                    }
                }
                else {
                    const nonFilePayload = JSON.stringify(postData.text);
                    if (nonFilePayload) {
                        push(`payload = ${nonFilePayload}`);
                        hasPayload = true;
                    }
                }
                break;
            default: {
                if (!postData) {
                    break;
                }
                if (postData.mimeType === 'application/x-www-form-urlencoded' && postData.paramsObj) {
                    push(`payload = ${(0, helpers_js_1.literalRepresentation)(postData.paramsObj, opts)}`);
                    hasPayload = true;
                    break;
                }
                const payload = JSON.stringify(postData.text);
                if (payload) {
                    push(`payload = ${payload}`);
                    hasPayload = true;
                }
            }
        }
        // Construct headers
        const headerCount = Object.keys(headers).length;
        if (headerCount === 0 && (hasPayload || hasFiles)) {
            // If we don't have any heads but we do have a payload we should put a blank line here between that payload consturction and our execution of the requests library.
            blank();
        }
        else if (headerCount === 1) {
            for (const header in headers) {
                push(`headers = {"${header}": "${(0, escape_js_1.escapeForDoubleQuotes)(headers[header])}"}`);
                blank();
            }
        }
        else if (headerCount > 1) {
            let count = 1;
            push('headers = {');
            for (const header in headers) {
                if (count !== headerCount) {
                    push(`"${header}": "${(0, escape_js_1.escapeForDoubleQuotes)(headers[header])}",`, 1);
                }
                else {
                    push(`"${header}": "${(0, escape_js_1.escapeForDoubleQuotes)(headers[header])}"`, 1);
                }
                count += 1;
            }
            push('}');
            blank();
        }
        // Construct request
        let request = builtInMethods.includes(method)
            ? `response = requests.${method.toLowerCase()}(url`
            : `response = requests.request("${method}", url`;
        if (hasPayload) {
            if (jsonPayload) {
                request += ', json=payload';
            }
            else {
                request += ', data=payload';
            }
        }
        if (hasFiles) {
            request += ', files=files';
        }
        if (headerCount > 0) {
            request += ', headers=headers';
        }
        if (qs) {
            request += ', params=querystring';
        }
        request += ')';
        push(request);
        blank();
        // Print response
        push('print(response.json())');
        return join();
    },
};
