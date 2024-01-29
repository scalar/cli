import { describe, expect, it } from 'vitest';
import { getOperationByMethodAndPath } from './getOperationByMethodAndPath';
describe('getOperationByMethodAndPath', function () {
    it('matches plain strings', function () {
        var schema = {
            paths: {
                '/foo': {
                    get: {
                        operationId: 'getFoo',
                    },
                },
            },
        };
        expect(getOperationByMethodAndPath(schema, 'get', '/foo')).toMatchObject({
            operationId: 'getFoo',
        });
    });
    it('matches paths with variables', function () {
        var schema = {
            paths: {
                '/foo/{id}': {
                    get: {
                        operationId: 'getFooById',
                    },
                },
            },
        };
        expect(getOperationByMethodAndPath(schema, 'get', '/foo/123')).toMatchObject({
            operationId: 'getFooById',
        });
    });
});
