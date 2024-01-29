/**
 * @description
 * HTTP code snippet generator for Swift using NSURLSession.
 *
 * @author
 * @thibaultCha
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
import type { Client } from '../../targets.js';
export interface NsurlsessionOptions {
    pretty?: boolean;
    timeout?: number | string;
}
export declare const nsurlsession: Client<NsurlsessionOptions>;
