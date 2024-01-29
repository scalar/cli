"use strict";
/**
 * @description
 * HTTP code snippet generator for Javascript & Node.js using Axios.
 *
 * @author
 * @rohit-gohri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axios = void 0;
const stringify_object_1 = __importDefault(require("stringify-object"));
const code_builder_js_1 = require("../../../helpers/code-builder.js");
exports.axios = {
    info: {
        key: 'axios',
        title: 'Axios',
        link: 'https://github.com/axios/axios',
        description: 'Promise based HTTP client for the browser and node.js',
    },
    convert: ({ allHeaders, method, url, queryObj, postData }, options) => {
        const opts = {
            indent: '  ',
            ...options,
        };
        const { blank, push, join, addPostProcessor } = new code_builder_js_1.CodeBuilder({ indent: opts.indent });
        push("import axios from 'axios';");
        blank();
        const requestOptions = {
            method,
            url,
        };
        if (Object.keys(queryObj).length) {
            requestOptions.params = queryObj;
        }
        if (Object.keys(allHeaders).length) {
            requestOptions.headers = allHeaders;
        }
        switch (postData === null || postData === void 0 ? void 0 : postData.mimeType) {
            case 'application/x-www-form-urlencoded':
                if (postData.params) {
                    push('const encodedParams = new URLSearchParams();');
                    postData.params.forEach(param => {
                        push(`encodedParams.set('${param.name}', '${param.value}');`);
                    });
                    blank();
                    requestOptions.data = 'encodedParams,';
                    addPostProcessor(code => code.replace(/'encodedParams,'/, 'encodedParams,'));
                }
                break;
            case 'application/json':
                if (postData.jsonObj) {
                    requestOptions.data = postData.jsonObj;
                }
                break;
            case 'multipart/form-data':
                if (!postData.params) {
                    break;
                }
                push('const form = new FormData();');
                postData.params.forEach(param => {
                    push(`form.append('${param.name}', '${param.value || param.fileName || ''}');`);
                });
                blank();
                requestOptions.data = '[form]';
                break;
            default:
                if (postData === null || postData === void 0 ? void 0 : postData.text) {
                    requestOptions.data = postData.text;
                }
        }
        const optionString = (0, stringify_object_1.default)(requestOptions, {
            indent: '  ',
            inlineCharacterLimit: 80,
        }).replace('"[form]"', 'form');
        push(`const options = ${optionString};`);
        blank();
        push('try {');
        push('const { data } = await axios.request(options);', 1);
        push('console.log(data);', 1);
        push('} catch (error) {');
        push('console.error(error);', 1);
        push('}');
        return join();
    },
};
