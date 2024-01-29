import type { TargetId, ClientId, Request } from '@scalar/snippetz-core';
import { undici } from '@scalar/snippetz-plugin-node-undici';
export declare function snippetz(): {
    get(target: TargetId, client: ClientId, request: Partial<Request>): import("@scalar/snippetz-core").Source | undefined;
    print(target: TargetId, client: ClientId, request: Partial<Request>): string | undefined;
    targets(): TargetId[];
    clients(): ClientId[];
    plugins(): {
        target: TargetId;
        client: ClientId;
    }[];
    findPlugin(target: TargetId, client: ClientId): typeof undici | undefined;
    hasPlugin(target: string, client: ClientId): boolean;
};
//# sourceMappingURL=snippetz.d.ts.map