import { describe, expect, it } from 'vitest';
import { ScalarCli } from '../../../tests/invoke-cli';
import { version } from '../../../package.json';
describe('--version', function () {
    it('outputs the version from package.json', function () {
        var _a = ScalarCli().setCwd('../').invoke(['--version']), exitCode = _a[0], logs = _a[1];
        logs.should.contain(version);
        expect(exitCode).toBe(0);
    });
});
