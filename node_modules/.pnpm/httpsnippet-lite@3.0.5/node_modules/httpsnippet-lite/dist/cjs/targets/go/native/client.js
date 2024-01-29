"use strict";
/**
 * @description
 * HTTP code snippet generator for native Go.
 *
 * @author
 * @montanaflynn
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.native = void 0;
const code_builder_js_1 = require("../../../helpers/code-builder.js");
const escape_js_1 = require("../../../helpers/escape.js");
exports.native = {
    info: {
        key: 'native',
        title: 'NewRequest',
        link: 'http://golang.org/pkg/net/http/#NewRequest',
        description: 'Golang HTTP client request',
    },
    convert: ({ postData, method, allHeaders, fullUrl }, options = {}) => {
        const { blank, push, join } = new code_builder_js_1.CodeBuilder({ indent: '\t' });
        const { showBoilerplate = true, checkErrors = false, printBody = true, timeout = -1, insecureSkipVerify = false, } = options;
        const errorPlaceholder = checkErrors ? 'err' : '_';
        const indent = showBoilerplate ? 1 : 0;
        const errorCheck = () => {
            if (checkErrors) {
                push('if err != nil {', indent);
                push('panic(err)', indent + 1);
                push('}', indent);
            }
        };
        // Create boilerplate
        if (showBoilerplate) {
            push('package main');
            blank();
            push('import (');
            push('"fmt"', indent);
            if (timeout > 0) {
                push('"time"', indent);
            }
            if (insecureSkipVerify) {
                push('"crypto/tls"', indent);
            }
            if (postData === null || postData === void 0 ? void 0 : postData.text) {
                push('"strings"', indent);
            }
            push('"net/http"', indent);
            if (printBody) {
                push('"io"', indent);
            }
            push(')');
            blank();
            push('func main() {');
            blank();
        }
        // Create an insecure transport for the client
        if (insecureSkipVerify) {
            push('insecureTransport := http.DefaultTransport.(*http.Transport).Clone()', indent);
            push('insecureTransport.TLSClientConfig = &tls.Config{InsecureSkipVerify: true}', indent);
        }
        // Create client
        const hasTimeout = timeout > 0;
        const hasClient = hasTimeout || insecureSkipVerify;
        const client = hasClient ? 'client' : 'http.DefaultClient';
        if (hasClient) {
            push('client := http.Client{', indent);
            if (hasTimeout) {
                push(`Timeout: time.Duration(${timeout} * time.Second),`, indent + 1);
            }
            if (insecureSkipVerify) {
                push('Transport: insecureTransport,', indent + 1);
            }
            push('}', indent);
            blank();
        }
        push(`url := "${fullUrl}"`, indent);
        blank();
        // If we have body content or not create the var and reader or nil
        if (postData === null || postData === void 0 ? void 0 : postData.text) {
            push(`payload := strings.NewReader(${JSON.stringify(postData.text)})`, indent);
            blank();
            push(`req, ${errorPlaceholder} := http.NewRequest("${method}", url, payload)`, indent);
            blank();
        }
        else {
            push(`req, ${errorPlaceholder} := http.NewRequest("${method}", url, nil)`, indent);
            blank();
        }
        errorCheck();
        // Add headers
        if (Object.keys(allHeaders).length) {
            Object.keys(allHeaders).forEach(key => {
                push(`req.Header.Add("${key}", "${(0, escape_js_1.escapeForDoubleQuotes)(allHeaders[key])}")`, indent);
            });
            blank();
        }
        // Make request
        push(`res, ${errorPlaceholder} := ${client}.Do(req)`, indent);
        errorCheck();
        // Get Body
        if (printBody) {
            blank();
            push('defer res.Body.Close()', indent);
            push(`body, ${errorPlaceholder} := io.ReadAll(res.Body)`, indent);
            errorCheck();
        }
        // Print it
        blank();
        push('fmt.Println(res)', indent);
        if (printBody) {
            push('fmt.Println(string(body))', indent);
        }
        // End main block
        if (showBoilerplate) {
            blank();
            push('}');
        }
        return join();
    },
};
