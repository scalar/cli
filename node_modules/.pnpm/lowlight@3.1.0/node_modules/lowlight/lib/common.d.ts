/**
 * Map of grammars.
 *
 * @type {Record<string, LanguageFn>}
 */
export const grammars: Record<string, LanguageFn>;
export type LanguageFn = import('highlight.js').LanguageFn;
