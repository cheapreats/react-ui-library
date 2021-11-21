export interface ResponsiveInterface {
    media?: {
        [name: string]: Function;
    };
}
export declare const Responsive: ({ media, ...props }: ResponsiveInterface) => string;
export declare const ResponsiveProps: string[];
