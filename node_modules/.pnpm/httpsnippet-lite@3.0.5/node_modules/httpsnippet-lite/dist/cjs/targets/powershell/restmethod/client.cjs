"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restmethod = void 0;
const common_js_1 = require("../common.cjs");
exports.restmethod = {
    info: {
        key: 'restmethod',
        title: 'Invoke-RestMethod',
        link: 'https://docs.microsoft.com/en-us/powershell/module/Microsoft.PowerShell.Utility/Invoke-RestMethod',
        description: 'Powershell Invoke-RestMethod client',
    },
    convert: (0, common_js_1.generatePowershellConvert)('Invoke-RestMethod'),
};
