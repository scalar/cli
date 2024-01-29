"use strict";
/**
 * @description
 * HTTP code snippet generator for the Shell using Wget.
 *
 * @author
 * @AhmadNassri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.wget = void 0;
const code_builder_js_1 = require("../../../helpers/code-builder.cjs");
const shell_js_1 = require("../../../helpers/shell.cjs");
exports.wget = {
    info: {
        key: 'wget',
        title: 'Wget',
        link: 'https://www.gnu.org/software/wget/',
        description: 'a free software package for retrieving files using HTTP, HTTPS',
    },
    convert: ({ method, postData, allHeaders, fullUrl }, options) => {
        const opts = {
            indent: '  ',
            short: false,
            verbose: false,
            ...options,
        };
        const { push, join } = new code_builder_js_1.CodeBuilder({
            indent: opts.indent,
            // @ts-expect-error SEEMS LEGIT
            join: opts.indent !== false ? ` \\\n${opts.indent}` : ' ',
        });
        if (opts.verbose) {
            push(`wget ${opts.short ? '-v' : '--verbose'}`);
        }
        else {
            push(`wget ${opts.short ? '-q' : '--quiet'}`);
        }
        push(`--method ${(0, shell_js_1.quote)(method)}`);
        Object.keys(allHeaders).forEach(key => {
            const header = `${key}: ${allHeaders[key]}`;
            push(`--header ${(0, shell_js_1.quote)(header)}`);
        });
        if (postData === null || postData === void 0 ? void 0 : postData.text) {
            push(`--body-data ${(0, shell_js_1.escape)((0, shell_js_1.quote)(postData.text))}`);
        }
        push(opts.short ? '-O' : '--output-document');
        push(`- ${(0, shell_js_1.quote)(fullUrl)}`);
        return join();
    },
};
