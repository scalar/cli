"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restsharp = void 0;
const code_builder_js_1 = require("../../../helpers/code-builder.cjs");
const escape_js_1 = require("../../../helpers/escape.cjs");
const headers_js_1 = require("../../../helpers/headers.cjs");
exports.restsharp = {
    info: {
        key: 'restsharp',
        title: 'RestSharp',
        link: 'http://restsharp.org/',
        description: 'Simple REST and HTTP API Client for .NET',
    },
    convert: ({ allHeaders, method, fullUrl, headersObj, cookies, postData }) => {
        const { push, join } = new code_builder_js_1.CodeBuilder();
        const isSupportedMethod = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'].includes(method.toUpperCase());
        if (!isSupportedMethod) {
            return 'Method not supported';
        }
        push(`var client = new RestClient("${fullUrl}");`);
        push(`var request = new RestRequest(Method.${method.toUpperCase()});`);
        // Add headers, including the cookies
        Object.keys(headersObj).forEach(key => {
            push(`request.AddHeader("${key}", "${(0, escape_js_1.escapeForDoubleQuotes)(headersObj[key])}");`);
        });
        cookies === null || cookies === void 0 ? void 0 : cookies.forEach(({ name, value }) => {
            push(`request.AddCookie("${name}", "${value}");`);
        });
        if (postData === null || postData === void 0 ? void 0 : postData.text) {
            const header = (0, headers_js_1.getHeader)(allHeaders, 'content-type');
            const text = JSON.stringify(postData.text);
            push(`request.AddParameter("${header}", ${text}, ParameterType.RequestBody);`);
        }
        push('IRestResponse response = client.Execute(request);');
        return join();
    },
};
