/**
 * Apply syntax highlighting.
 *
 * @param {Readonly<Options> | null | undefined} [options]
 *   Configuration (optional).
 * @returns
 *   Transform.
 */
export default function rehypeHighlight(options?: Readonly<Options> | null | undefined): (tree: Root, file: VFile) => undefined;
export type Element = import('hast').Element;
export type ElementContent = import('hast').ElementContent;
export type Root = import('hast').Root;
export type LanguageFn = import('lowlight').LanguageFn;
export type VFile = import('vfile').VFile;
/**
 * Configuration (optional).
 */
export type Options = {
    /**
     * Register more aliases (optional);
     * passed to `lowlight.registerAlias`.
     */
    aliases?: Readonly<Record<string, ReadonlyArray<string> | string>> | null | undefined;
    /**
     * Highlight code without language classes by guessing its programming
     * language (default: `false`).
     */
    detect?: boolean | null | undefined;
    /**
     * Register languages (default: `common`);
     * passed to `lowlight.register`.
     */
    languages?: Readonly<Record<string, LanguageFn>> | null | undefined;
    /**
     * List of language names to not highlight (optional);
     * note you can also add `no-highlight` classes.
     */
    plainText?: ReadonlyArray<string> | null | undefined;
    /**
     * Class prefix (default: `'hljs-'`).
     */
    prefix?: string | null | undefined;
    /**
     * Names of languages to check when detecting (default: all registered
     * languages).
     */
    subset?: ReadonlyArray<string> | null | undefined;
};
