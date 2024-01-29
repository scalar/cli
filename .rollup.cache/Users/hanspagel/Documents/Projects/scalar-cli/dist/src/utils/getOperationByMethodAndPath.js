export function getOperationByMethodAndPath(schema, method, path) {
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
