"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webrequest = void 0;
const common_js_1 = require("../common.cjs");
exports.webrequest = {
    info: {
        key: 'webrequest',
        title: 'Invoke-WebRequest',
        link: 'https://docs.microsoft.com/en-us/powershell/module/Microsoft.PowerShell.Utility/Invoke-WebRequest',
        description: 'Powershell Invoke-WebRequest client',
    },
    convert: (0, common_js_1.generatePowershellConvert)('Invoke-WebRequest'),
};
