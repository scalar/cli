#!/usr/bin/env node
import fs from 'node:fs';
import { serve } from '@hono/node-server';
import { getExampleFromSchema } from '@scalar/api-reference';
import { Validator } from '@seriousme/openapi-schema-validator';
import { Command } from 'commander';
import { Hono } from 'hono';
import kleur from 'kleur';
import { format } from 'prettier';
import prettyjson from 'prettyjson';
import prompts from 'prompts';
import toml from 'toml-js';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var version = "0.1.0";

function getOperationByMethodAndPath(schema, method, path) {
    var _a, _b, _c, _d, _e, _f, _g;
    // Compare just the strings
    if ((_b = (_a = schema.paths) === null || _a === void 0 ? void 0 : _a[path]) === null || _b === void 0 ? void 0 : _b[method.toLowerCase()]) {
        return (_d = (_c = schema.paths) === null || _c === void 0 ? void 0 : _c[path]) === null || _d === void 0 ? void 0 : _d[method.toLowerCase()];
    }
    // Loop through all pathRegex and find the one where the regex matches the path
    // Create a Regex for all paths with variables
    var pathRegex = Object.keys((_e = schema.paths) !== null && _e !== void 0 ? _e : {})
        .filter(function (path) {
        return path.includes('{');
    })
        .map(function (operationPath) {
        return {
            path: operationPath,
            regex: new RegExp(operationPath.replace(/{([^}]+)}/g, function (_, name) { return "(?<".concat(name, ">[^/]+)"); })),
        };
    });
    // Find a Regex that matches the given path
    var matchedPath = pathRegex.find(function (_a) {
        var regex = _a.regex;
        return regex.test(path);
    });
    // Return the operation
    if (matchedPath === null || matchedPath === void 0 ? void 0 : matchedPath.path) {
        return (_g = (_f = schema.paths) === null || _f === void 0 ? void 0 : _f[matchedPath === null || matchedPath === void 0 ? void 0 : matchedPath.path]) === null || _g === void 0 ? void 0 : _g[method.toLowerCase()];
    }
    return null;
}

function readFile(file) {
    try {
        return fs.readFileSync(file, 'utf8');
    }
    catch (err) {
        console.error(err);
    }
}
function getOpenApiFile(file) {
    return __awaiter(this, void 0, void 0, function () {
        var validator, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validator = new Validator();
                    return [4 /*yield*/, validator.validate(file)];
                case 1:
                    result = _a.sent();
                    if (!result.valid) {
                        console.warn(kleur.bold().yellow('[WARN]'), kleur.yellow('File doesn’t match the OpenAPI specification.'));
                        console.log();
                    }
                    return [2 /*return*/, validator.resolveRefs()];
            }
        });
    });
}
function getRawOpenApiFile(file) {
    return __awaiter(this, void 0, void 0, function () {
        var validator, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validator = new Validator();
                    return [4 /*yield*/, validator.validate(file)];
                case 1:
                    result = _a.sent();
                    if (!result.valid) {
                        console.warn(kleur.bold().yellow('[WARN]'), kleur.yellow('File doesn’t match the OpenAPI specification.'));
                        console.log();
                    }
                    return [2 /*return*/, validator.specification];
            }
        });
    });
}
function getMethodColor(method) {
    var _a;
    var colors = {
        get: 'green',
        post: 'cyan',
        put: 'yellow',
        delete: 'red',
        patch: 'magenta',
    };
    return (_a = colors[method.toLowerCase()]) !== null && _a !== void 0 ? _a : 'grey';
}
function getFileFromConfiguration(file) {
    var _a;
    // If file is empty, throw an exception
    if (file) {
        return file;
    }
    // Try to load the configuration
    try {
        var configuration = toml.parse(fs.readFileSync('scalar.toml', 'utf8'));
        if ((_a = configuration === null || configuration === void 0 ? void 0 : configuration.reference) === null || _a === void 0 ? void 0 : _a.file) {
            return configuration.reference.file;
        }
    }
    catch (_b) { }
    console.error(kleur.red('No file provided.'));
    console.log();
    console.log(kleur.white('Try `scalar init` or add the file as an argument. Read `scalar --help` for more information.'));
    console.log();
    process.exit(1);
}
var program = new Command();
program
    .name('@scalar/cli')
    .description('CLI to work with your OpenAPI files')
    .version(version);
program
    .command('init')
    .description('Create a new `scalar.toml` file')
    .option('-f, --file [file]', 'your OpenAPI file')
    .action(function (_a) {
    var file = _a.file;
    return __awaiter(void 0, void 0, void 0, function () {
        var overwrite, configuration, input, _b, content;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!fs.existsSync('scalar.toml')) return [3 /*break*/, 2];
                    console.warn(kleur.yellow('A `scalar.toml` file already exists.'));
                    console.log();
                    return [4 /*yield*/, prompts({
                            type: 'toggle',
                            name: 'overwrite',
                            message: 'Do you want to override the file?',
                            initial: false,
                            active: 'yes',
                            inactive: 'no',
                        })];
                case 1:
                    overwrite = (_c.sent()).overwrite;
                    if (overwrite === false) {
                        console.log();
                        process.exit(1);
                    }
                    _c.label = 2;
                case 2:
                    configuration = {
                        reference: { file: '' },
                    };
                    if (!file) return [3 /*break*/, 3];
                    _b = {
                        input: file,
                    };
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, prompts({
                        type: 'text',
                        name: 'input',
                        message: 'Where is your OpenAPI file?',
                        initial: './openapi.json',
                        validate: function (input) {
                            return fs.existsSync(input) ? true : 'File doesn’t exist.';
                        },
                    })];
                case 4:
                    _b = _c.sent();
                    _c.label = 5;
                case 5:
                    input = (_b).input;
                    configuration.reference.file = input;
                    content = toml.dump(configuration);
                    console.log();
                    console.log(kleur.bold().white('    scalar.toml'));
                    console.log();
                    console.log(content
                        .trim()
                        .split('\n')
                        .map(function (line) { return kleur.grey("    ".concat(line)); })
                        .join('\n'));
                    console.log();
                    // Create `scalar.toml` file
                    fs.writeFileSync('scalar.toml', content);
                    console.log(kleur.green('Created a new project configuration.'));
                    console.log(kleur.white("Run ".concat(kleur
                        .grey()
                        .bold('scalar --help'), " to see all available commands.")));
                    console.log();
                    return [2 /*return*/];
            }
        });
    });
});
program
    .command('format')
    .description('Format an OpenAPI file')
    .argument('[file]', 'file to format')
    .action(function (fileArgument) { return __awaiter(void 0, void 0, void 0, function () {
    var startTime, file, fileContent, newContent, endTime;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                startTime = performance.now();
                file = getFileFromConfiguration(fileArgument);
                fileContent = readFile(file);
                if (!fileContent) {
                    console.error(kleur.red('Couldn’t read file.'));
                    process.exit(1);
                }
                return [4 /*yield*/, format(fileContent, {
                        semi: false,
                        parser: 'json',
                    })
                    // Replace file content with newContent
                ];
            case 1:
                newContent = _a.sent();
                // Replace file content with newContent
                fs.writeFileSync(file, newContent, 'utf8');
                endTime = performance.now();
                console.log(kleur.green('File formatted'), kleur.grey("in ".concat(kleur.white("".concat(kleur.bold("".concat(Math.round(endTime - startTime))), " ms")))));
                console.log();
                return [2 /*return*/];
        }
    });
}); });
program
    .command('validate')
    .description('Validate an OpenAPI file')
    .argument('[file]', 'file to validate')
    .action(function (fileArgument) { return __awaiter(void 0, void 0, void 0, function () {
    var startTime, file, validator, result, endTime;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                startTime = performance.now();
                file = getFileFromConfiguration(fileArgument);
                validator = new Validator();
                return [4 /*yield*/, validator.validate(file)];
            case 1:
                result = _b.sent();
                if (result.valid) {
                    console.log(kleur.green("Matches the OpenAPI specification".concat(kleur.white(" (OpenAPI ".concat(kleur.bold(validator.version), ")")))));
                    endTime = performance.now();
                    console.log();
                    console.log(kleur.green('File validated'), kleur.grey("in ".concat(kleur.white("".concat(kleur.bold("".concat(Math.round(endTime - startTime))), " ms")))));
                    console.log();
                }
                else {
                    console.log(prettyjson.render(result.errors));
                    console.log();
                    console.error(kleur.red('File doesn’t match the OpenAPI specification.'));
                    console.log();
                    console.error(kleur.red("".concat(kleur.bold("".concat((_a = result.errors) === null || _a === void 0 ? void 0 : _a.length, " error").concat(result.errors && result.errors.length > 1 ? 's' : '')), " found.")));
                    console.log();
                    process.exit(1);
                }
                return [2 /*return*/];
        }
    });
}); });
program
    .command('share')
    .description('Share an OpenAPI file')
    .argument('[file]', 'file to share')
    .action(function (fileArgument) { return __awaiter(void 0, void 0, void 0, function () {
    var file;
    return __generator(this, function (_a) {
        file = getFileFromConfiguration(fileArgument);
        fetch('https://sandbox.scalar.com/api/share', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: readFile(file),
            }),
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            var id = data.id;
            console.log(kleur.bold().green('Your OpenAPI file is public.'));
            console.log();
            console.log("".concat(kleur.green('➜'), " ").concat(kleur
                .bold()
                .white('API Reference:'.padEnd(14)), " ").concat(kleur.cyan("https://sandbox.scalar.com/p/".concat(id))));
            console.log("".concat(kleur.grey('➜'), " ").concat(kleur
                .bold()
                .grey('Editor:'.padEnd(14)), " ").concat(kleur.cyan("https://sandbox.scalar.com/e/".concat(id))));
            console.log();
            console.log("".concat(kleur.grey('➜'), " ").concat(kleur
                .bold()
                .grey('OpenAPI JSON:'.padEnd(14)), " ").concat(kleur.cyan("https://sandbox.scalar.com/files/".concat(id, "/openapi.json"))));
            console.log("".concat(kleur.grey('➜'), " ").concat(kleur
                .bold()
                .grey('OpenAPI YAML:'.padEnd(14)), " ").concat(kleur.cyan("https://sandbox.scalar.com/files/".concat(id, "/openapi.yaml"))));
            console.log();
        })
            .catch(function (error) {
            console.error('Failed to share the file.');
            console.log();
            console.error('Error:', error);
            console.log();
            process.exit(1);
        });
        return [2 /*return*/];
    });
}); });
program
    .command('mock')
    .description('Mock an API from an OpenAPI file')
    .argument('[file]', 'OpenAPI file to mock the server for')
    .option('-w, --watch', 'watch the file for changes')
    .option('-p, --port <port>', 'set the HTTP port for the mock server')
    .action(function (fileArgument, _a) {
    var watch = _a.watch, port = _a.port;
    return __awaiter(void 0, void 0, void 0, function () {
        var file, schema, path, method, app;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    file = getFileFromConfiguration(fileArgument);
                    return [4 /*yield*/, getOpenApiFile(file)
                        // watch file for changes
                    ];
                case 1:
                    schema = _d.sent();
                    // watch file for changes
                    if (watch) {
                        fs.watchFile(file, function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.log(kleur.bold().white('[INFO]'), kleur.grey('Mock Server was updated.'));
                                        return [4 /*yield*/, getOpenApiFile(file)];
                                    case 1:
                                        schema = _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    console.log(kleur.bold().white('Available Paths'));
                    console.log();
                    if ((schema === null || schema === void 0 ? void 0 : schema.paths) === undefined ||
                        Object.keys(schema === null || schema === void 0 ? void 0 : schema.paths).length === 0) {
                        console.log(kleur.bold().yellow('[WARN]'), kleur.grey('Couldn’t find any paths in the OpenAPI file.'));
                    }
                    // loop through all paths
                    for (path in (_b = schema === null || schema === void 0 ? void 0 : schema.paths) !== null && _b !== void 0 ? _b : []) {
                        // loop through all methods
                        for (method in (_c = schema.paths) === null || _c === void 0 ? void 0 : _c[path]) {
                            console.log("".concat(kleur
                                .bold()[getMethodColor(method)](method.toUpperCase().padEnd(6)), " ").concat(kleur.grey("".concat(path))));
                        }
                    }
                    console.log();
                    app = new Hono();
                    app.all('/*', function (c) {
                        var _a = c.req, method = _a.method, path = _a.path;
                        var operation = getOperationByMethodAndPath(schema, method, path);
                        console.log("".concat(kleur
                            .bold()[getMethodColor(method)](method.toUpperCase().padEnd(6)), " ").concat(kleur.grey("".concat(path))), "".concat(kleur.grey('→'), " ").concat((operation === null || operation === void 0 ? void 0 : operation.operationId)
                            ? kleur.white(operation.operationId)
                            : kleur.red('[ERROR] 404 Not Found')));
                        if (!operation) {
                            return c.text('Not found', 404);
                        }
                        // if (!operation) {
                        //   return c.text('Method not allowed', 405)
                        // }
                        var jsonResponseConfiguration = operation.responses['200'].content['application/json'];
                        var response = jsonResponseConfiguration.example
                            ? jsonResponseConfiguration.example
                            : jsonResponseConfiguration.schema
                                ? getExampleFromSchema(jsonResponseConfiguration.schema, {
                                    emptyString: '…',
                                })
                                : null;
                        return c.json(response);
                    });
                    serve({
                        fetch: app.fetch,
                        port: port !== null && port !== void 0 ? port : 3000,
                    }, function (info) {
                        console.log("".concat(kleur.bold().green('➜ Mock Server'), " ").concat(kleur.white('listening on'), " ").concat(kleur.cyan("http://localhost:".concat(info.port))));
                        console.log();
                    });
                    return [2 /*return*/];
            }
        });
    });
});
program
    .command('reference')
    .description('Serve an API Reference from an OpenAPI file')
    .argument('[file]', 'OpenAPI file to show the reference for')
    .option('-w, --watch', 'watch the file for changes')
    .option('-p, --port <port>', 'set the HTTP port for the API reference server')
    .action(function (fileArgument, _a) {
    var watch = _a.watch, port = _a.port;
    return __awaiter(void 0, void 0, void 0, function () {
        var file, specification, app;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    file = getFileFromConfiguration(fileArgument);
                    return [4 /*yield*/, getRawOpenApiFile(file)
                        // watch file for changes
                    ];
                case 1:
                    specification = _b.sent();
                    // watch file for changes
                    if (watch) {
                        fs.watchFile(file, function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.log(kleur.bold().white('[INFO]'), kleur.grey('OpenAPI file modified'));
                                        return [4 /*yield*/, getRawOpenApiFile(file)];
                                    case 1:
                                        specification = _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    if ((specification === null || specification === void 0 ? void 0 : specification.paths) === undefined ||
                        Object.keys(specification === null || specification === void 0 ? void 0 : specification.paths).length === 0) {
                        console.log(kleur.bold().yellow('[WARN]'), kleur.grey('Couldn’t find any paths in the OpenAPI file.'));
                    }
                    app = new Hono();
                    app.get('/', function (c) {
                        return c.html("<!doctype html>\n        <html>\n          <head>\n            <title>API Reference</title>\n            <meta charset=\"utf-8\" />\n            <meta\n              name=\"viewport\"\n              content=\"width=device-width, initial-scale=1\" />\n            <style>\n              body {\n                margin: 0;\n              }\n            </style>\n          </head>\n          <body>\n            <script\n              id=\"api-reference\"\n              type=\"application/json\"\n              data-proxy-url=\"https://api.scalar.com/request-proxy\">".concat(JSON.stringify(specification), "</script>\n            <script src=\"https://cdn.jsdelivr.net/npm/@scalar/api-reference\"></script>\n          </body>\n        </html>"));
                    });
                    serve({
                        fetch: app.fetch,
                        port: port !== null && port !== void 0 ? port : 3000,
                    }, function (info) {
                        console.log("".concat(kleur.bold().green('➜ API Reference Server'), " ").concat(kleur.white('listening on'), " ").concat(kleur.cyan("http://localhost:".concat(info.port))));
                        console.log();
                    });
                    return [2 /*return*/];
            }
        });
    });
});
program.parse();
