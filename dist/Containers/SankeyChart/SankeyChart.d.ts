import React from 'react';
interface IMargin {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}
interface ISankeyChartOptionalProperties {
    nodePadding?: number;
    margin?: Partial<IMargin>;
    nodeColor?: string;
    linkColor?: string;
}
export interface ISankeyChartProps extends ISankeyChartOptionalProperties {
    width: number;
    height: number;
    data: any;
}
export declare const SankeyChart: React.FC<ISankeyChartProps>;
export {};
/**
 * this is how a custom link will be made
 */
