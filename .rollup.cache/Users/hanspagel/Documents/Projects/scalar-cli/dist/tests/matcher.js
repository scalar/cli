import { expect } from 'vitest';
export function createLogsMatcher(output) {
    return {
        logOutput: function () {
            console.log(output);
        },
        should: {
            contain: function (match) { return expect(output).toContain(match); },
            not: {
                contain: function (match) { return expect(output).not.toContain(match); },
            },
        },
    };
}
