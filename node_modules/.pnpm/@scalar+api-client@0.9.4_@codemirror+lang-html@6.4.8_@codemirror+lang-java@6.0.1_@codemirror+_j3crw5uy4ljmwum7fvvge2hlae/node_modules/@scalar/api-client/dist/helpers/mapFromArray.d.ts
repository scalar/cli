/**
 * A utility function to convert an array of objects to an object of objects.
 */
export declare function mapFromArray<T extends Record<string, unknown>, K extends keyof T & string, V extends keyof T & string>(arr: T[], key: K, valueKey: V): Record<string, T[V]>;
//# sourceMappingURL=mapFromArray.d.ts.map