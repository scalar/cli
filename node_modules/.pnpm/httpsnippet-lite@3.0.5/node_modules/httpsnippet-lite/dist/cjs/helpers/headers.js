"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMimeTypeJSON = exports.hasHeader = exports.getHeader = exports.getHeaderName = void 0;
/**
 * Given a headers object retrieve a specific header out of it via a case-insensitive key.
 */
const getHeaderName = (headers, name) => Object.keys(headers).find(header => header.toLowerCase() === name.toLowerCase());
exports.getHeaderName = getHeaderName;
/**
 * Given a headers object retrieve the contents of a header out of it via a case-insensitive key.
 */
const getHeader = (headers, name) => {
    const headerName = (0, exports.getHeaderName)(headers, name);
    if (!headerName) {
        return undefined;
    }
    return headers[headerName];
};
exports.getHeader = getHeader;
/**
 * Determine if a given case-insensitive header exists within a header object.
 */
const hasHeader = (headers, name) => Boolean((0, exports.getHeaderName)(headers, name));
exports.hasHeader = hasHeader;
const mimeTypeJson = [
    'application/json',
    'application/x-json',
    'text/json',
    'text/x-json',
    '+json',
];
/**
 * Determines if a given mimetype is JSON, or a variant of such.
 */
const isMimeTypeJSON = (mimeType) => mimeTypeJson.some(type => mimeType.includes(type));
exports.isMimeTypeJSON = isMimeTypeJSON;
