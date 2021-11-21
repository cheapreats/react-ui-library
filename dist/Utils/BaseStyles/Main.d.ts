export interface MainInterface {
    margin?: string | number;
    padding?: string | number;
    inlineStyle?: string | Function;
}
export declare const Main: ({ margin, padding, inlineStyle, ...props }: MainInterface) => string;
export declare const MainProps: string[];
