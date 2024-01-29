"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedURL = exports.toSearchParams = void 0;
function toSearchParams(obj) {
    return new URLSearchParams(Object.entries(obj)
        .map(([key, value]) => {
        if (Array.isArray(value)) {
            return value.map(v => [key, v]);
        }
        return [[key, value]];
    })
        .flat(1));
}
exports.toSearchParams = toSearchParams;
class ExtendedURL extends URL {
    get path() {
        return this.pathname + this.search;
    }
}
exports.ExtendedURL = ExtendedURL;
