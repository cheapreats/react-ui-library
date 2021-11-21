export interface IContainerProps {
    dashed?: boolean;
    withFlexCenter?: boolean;
    withFlexSpaceBetween?: boolean;
    withBorder?: boolean;
    width?: number;
    padding?: string;
    isDragEnter?: boolean;
    backgroundColor?: string;
    borderRadius?: string;
    height?: number;
    opacity?: number;
    overflow?: string;
    position?: boolean;
    maxHeight?: number;
    margin?: string;
    positionTop?: number;
    flexGrow?: boolean;
}
export declare const Container: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, IContainerProps, never>;
interface IIconProps {
    color?: string;
    width: number;
    height: number;
}
export declare const Icon: import("styled-components").StyledComponent<"svg", import("styled-components").DefaultTheme, IIconProps, never>;
export {};
