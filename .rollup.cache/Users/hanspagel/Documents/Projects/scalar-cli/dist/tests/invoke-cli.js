import { join } from 'node:path';
import process from 'node:process';
import { execaSync } from 'execa';
import strip from 'strip-ansi';
import { createLogsMatcher } from './matcher';
var builtCliLocation = join(__dirname, '..', 'dist', 'index.js');
export function ScalarCli() {
    var cwd = '';
    var self = {
        setCwd: function (_cwd) {
            cwd = _cwd;
            return self;
        },
        invoke: function (args) {
            var _a;
            var NODE_ENV = 'production';
            try {
                var results = execaSync(process.execPath, [builtCliLocation].concat(args), {
                    cwd: cwd,
                    env: { NODE_ENV: NODE_ENV },
                });
                return [
                    results.exitCode,
                    createLogsMatcher(strip(results.stderr.toString() + results.stdout.toString())),
                ];
            }
            catch (e) {
                var execaError = e;
                return [
                    execaError.exitCode,
                    createLogsMatcher(strip(((_a = execaError.stdout) === null || _a === void 0 ? void 0 : _a.toString()) || '')),
                ];
            }
        },
    };
    return self;
}
