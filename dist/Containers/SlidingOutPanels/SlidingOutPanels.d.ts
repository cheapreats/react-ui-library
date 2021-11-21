import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
interface ImageProps {
    id: string;
    imageSource: string;
    alt: string;
    imagePanelClick?: (imageLink: string) => Function;
}
export interface SlidingOutPanelProps extends MainInterface, ResponsiveInterface {
    images: ImageProps[];
}
export declare const SlidingOutPanels: React.FC<SlidingOutPanelProps>;
export {};
