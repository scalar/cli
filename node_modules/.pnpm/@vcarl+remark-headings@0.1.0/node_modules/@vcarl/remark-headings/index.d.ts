import { Node } from "unist-util-visit";
import { VFileWithOutput } from "unified";
export interface Heading {
    depth: number;
    value: string;
    data?: any;
}
export declare const hasHeadingsData: (data: unknown) => data is {
    headings: Heading[];
};
export declare const headings: (root: Node) => Heading[];
export default function remarkHeadings(): (node: Node, file: VFileWithOutput<any>) => void;
