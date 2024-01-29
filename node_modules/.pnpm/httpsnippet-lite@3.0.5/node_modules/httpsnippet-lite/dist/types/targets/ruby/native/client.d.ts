import type { Client } from '../../targets.js';
export interface RubyNativeOptions {
    insecureSkipVerify?: boolean;
}
export declare const native: Client<RubyNativeOptions>;
