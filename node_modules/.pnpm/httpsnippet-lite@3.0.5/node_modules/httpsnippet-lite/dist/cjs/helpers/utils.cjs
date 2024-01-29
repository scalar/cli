"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extname = exports.availableTargets = void 0;
const targets_js_1 = require("../targets/targets.cjs");
const availableTargets = () => Object.keys(targets_js_1.targets).map(targetId => ({
    ...targets_js_1.targets[targetId].info,
    clients: Object.keys(targets_js_1.targets[targetId].clientsById).map(clientId => targets_js_1.targets[targetId].clientsById[clientId].info),
}));
exports.availableTargets = availableTargets;
const extname = (targetId) => { var _a; return ((_a = targets_js_1.targets[targetId]) === null || _a === void 0 ? void 0 : _a.info.extname) || ''; };
exports.extname = extname;
