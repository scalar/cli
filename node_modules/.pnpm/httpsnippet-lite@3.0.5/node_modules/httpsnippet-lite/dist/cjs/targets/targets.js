"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTargetClient = exports.isClient = exports.addTarget = exports.isValidTargetId = exports.isTarget = exports.targets = void 0;
const httpsnippet_js_1 = require("../httpsnippet.js");
const target_js_1 = require("./c/target.js");
const target_js_2 = require("./clojure/target.js");
const target_js_3 = require("./csharp/target.js");
const target_js_4 = require("./go/target.js");
const target_js_5 = require("./http/target.js");
const target_js_6 = require("./java/target.js");
const target_js_7 = require("./javascript/target.js");
const target_js_8 = require("./kotlin/target.js");
const target_js_9 = require("./node/target.js");
const target_js_10 = require("./objc/target.js");
const target_js_11 = require("./ocaml/target.js");
const target_js_12 = require("./php/target.js");
const target_js_13 = require("./powershell/target.js");
const target_js_14 = require("./python/target.js");
const target_js_15 = require("./r/target.js");
const target_js_16 = require("./ruby/target.js");
const target_js_17 = require("./shell/target.js");
const target_js_18 = require("./swift/target.js");
exports.targets = {
    c: target_js_1.c,
    clojure: target_js_2.clojure,
    csharp: target_js_3.csharp,
    go: target_js_4.go,
    http: target_js_5.http,
    java: target_js_6.java,
    javascript: target_js_7.javascript,
    kotlin: target_js_8.kotlin,
    node: target_js_9.node,
    objc: target_js_10.objc,
    ocaml: target_js_11.ocaml,
    php: target_js_12.php,
    powershell: target_js_13.powershell,
    python: target_js_14.python,
    r: target_js_15.r,
    ruby: target_js_16.ruby,
    shell: target_js_17.shell,
    swift: target_js_18.swift,
};
const isTarget = (target) => {
    if (typeof target !== 'object' || target === null || Array.isArray(target)) {
        const got = target === null ? 'null' : Array.isArray(target) ? 'array' : typeof target;
        throw new Error(`you tried to add a target which is not an object, got type: "${got}"`);
    }
    if (!Object.prototype.hasOwnProperty.call(target, 'info')) {
        throw new Error('targets must contain an `info` object');
    }
    if (!Object.prototype.hasOwnProperty.call(target.info, 'key')) {
        throw new Error('targets must have an `info` object with the property `key`');
    }
    if (!target.info.key) {
        throw new Error('target key must be a unique string');
    }
    if (Object.prototype.hasOwnProperty.call(exports.targets, target.info.key)) {
        throw new Error(`a target already exists with this key, \`${target.info.key}\``);
    }
    if (!Object.prototype.hasOwnProperty.call(target.info, 'title')) {
        throw new Error('targets must have an `info` object with the property `title`');
    }
    if (!target.info.title) {
        throw new Error('target title must be a non-zero-length string');
    }
    if (!Object.prototype.hasOwnProperty.call(target.info, 'extname')) {
        throw new Error('targets must have an `info` object with the property `extname`');
    }
    if (!Object.prototype.hasOwnProperty.call(target, 'clientsById') ||
        !target.clientsById ||
        Object.keys(target.clientsById).length === 0) {
        throw new Error(`No clients provided in target ${target.info.key}.  You must provide the property \`clientsById\` containg your clients.`);
    }
    if (!Object.prototype.hasOwnProperty.call(target.info, 'default')) {
        throw new Error('targets must have an `info` object with the property `default`');
    }
    if (!Object.prototype.hasOwnProperty.call(target.clientsById, target.info.default)) {
        throw new Error(`target ${target.info.key} is configured with a default client ${target.info.default}, but no such client was found in the property \`clientsById\` (found ${JSON.stringify(Object.keys(target.clientsById))})`);
    }
    Object.values(target.clientsById).forEach(exports.isClient);
    return true;
};
exports.isTarget = isTarget;
function isValidTargetId(value) {
    return (0, httpsnippet_js_1.availableTargets)().some(({ key }) => key === value);
}
exports.isValidTargetId = isValidTargetId;
const addTarget = (target) => {
    if (!(0, exports.isTarget)(target)) {
        return;
    }
    exports.targets[target.info.key] = target;
};
exports.addTarget = addTarget;
const isClient = (client) => {
    if (!client) {
        throw new Error('clients must be objects');
    }
    if (!Object.prototype.hasOwnProperty.call(client, 'info')) {
        throw new Error('targets client must contain an `info` object');
    }
    if (!Object.prototype.hasOwnProperty.call(client.info, 'key')) {
        throw new Error('targets client must have an `info` object with property `key`');
    }
    if (!client.info.key) {
        throw new Error('client.info.key must contain an identifier unique to this target');
    }
    if (!Object.prototype.hasOwnProperty.call(client.info, 'title')) {
        throw new Error('targets client must have an `info` object with property `title`');
    }
    if (!Object.prototype.hasOwnProperty.call(client.info, 'description')) {
        throw new Error('targets client must have an `info` object with property `description`');
    }
    if (!Object.prototype.hasOwnProperty.call(client.info, 'link')) {
        throw new Error('targets client must have an `info` object with property `link`');
    }
    if (!Object.prototype.hasOwnProperty.call(client, 'convert') ||
        typeof client.convert !== 'function') {
        throw new Error('targets client must have a `convert` property containing a conversion function');
    }
    return true;
};
exports.isClient = isClient;
const addTargetClient = (targetId, client) => {
    if (!(0, exports.isClient)(client)) {
        return;
    }
    if (!Object.prototype.hasOwnProperty.call(exports.targets, targetId)) {
        throw new Error(`Sorry, but no ${targetId} target exists to add clients to`);
    }
    if (Object.prototype.hasOwnProperty.call(exports.targets[targetId], client.info.key)) {
        throw new Error(`the target ${targetId} already has a client with the key ${client.info.key}, please use a different key`);
    }
    exports.targets[targetId].clientsById[client.info.key] = client;
};
exports.addTargetClient = addTargetClient;
