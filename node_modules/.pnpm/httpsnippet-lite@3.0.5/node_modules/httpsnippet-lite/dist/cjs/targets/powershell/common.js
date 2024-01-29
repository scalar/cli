"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePowershellConvert = void 0;
const code_builder_js_1 = require("../../helpers/code-builder.js");
const escape_js_1 = require("../../helpers/escape.js");
const headers_js_1 = require("../../helpers/headers.js");
const generatePowershellConvert = (command) => {
    const convert = ({ method, headersObj, cookies, uriObj, fullUrl, postData, allHeaders, }) => {
        const { push, join } = new code_builder_js_1.CodeBuilder();
        const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];
        if (!methods.includes(method.toUpperCase())) {
            return 'Method not supported';
        }
        const commandOptions = [];
        // Add headers, including the cookies
        const headers = Object.keys(headersObj);
        // construct headers
        if (headers.length) {
            push('$headers=@{}');
            headers.forEach(key => {
                if (key !== 'connection') {
                    // Not allowed
                    push(`$headers.Add("${key}", "${(0, escape_js_1.escapeString)(headersObj[key], { escapeChar: '`' })}")`);
                }
            });
            commandOptions.push('-Headers $headers');
        }
        // construct cookies
        if (cookies.length) {
            push('$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession');
            cookies.forEach(cookie => {
                push('$cookie = New-Object System.Net.Cookie');
                push(`$cookie.Name = '${cookie.name}'`);
                push(`$cookie.Value = '${cookie.value}'`);
                push(`$cookie.Domain = '${uriObj.host}'`);
                push('$session.Cookies.Add($cookie)');
            });
            commandOptions.push('-WebSession $session');
        }
        if (postData === null || postData === void 0 ? void 0 : postData.text) {
            commandOptions.push(`-ContentType '${(0, escape_js_1.escapeString)((0, headers_js_1.getHeader)(allHeaders, 'content-type'), {
                delimiter: "'",
                escapeChar: '`',
            })}'`);
            commandOptions.push(`-Body '${postData.text}'`);
        }
        push(`$response = ${command} -Uri '${fullUrl}' -Method ${method} ${commandOptions.join(' ')}`);
        return join();
    };
    return convert;
};
exports.generatePowershellConvert = generatePowershellConvert;
