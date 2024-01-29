"use strict";
/**
 * @description
 * HTTP code snippet generator for Java using java.net.http.
 *
 * @author
 * @wtetsu
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.nethttp = void 0;
const code_builder_js_1 = require("../../../helpers/code-builder.cjs");
const escape_js_1 = require("../../../helpers/escape.cjs");
exports.nethttp = {
    info: {
        key: 'nethttp',
        title: 'java.net.http',
        link: 'https://openjdk.java.net/groups/net/httpclient/intro.html',
        description: 'Java Standardized HTTP Client API',
    },
    convert: ({ allHeaders, fullUrl, method, postData }, options) => {
        const opts = {
            indent: '  ',
            ...options,
        };
        const { push, join } = new code_builder_js_1.CodeBuilder({ indent: opts.indent });
        push('HttpRequest request = HttpRequest.newBuilder()');
        push(`.uri(URI.create("${fullUrl}"))`, 2);
        Object.keys(allHeaders).forEach(key => {
            push(`.header("${key}", "${(0, escape_js_1.escapeForDoubleQuotes)(allHeaders[key])}")`, 2);
        });
        if (postData === null || postData === void 0 ? void 0 : postData.text) {
            push(`.method("${method.toUpperCase()}", HttpRequest.BodyPublishers.ofString(${JSON.stringify(postData.text)}))`, 2);
        }
        else {
            push(`.method("${method.toUpperCase()}", HttpRequest.BodyPublishers.noBody())`, 2);
        }
        push('.build();', 2);
        push('HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());');
        push('System.out.println(response.body());');
        return join();
    },
};
