import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
import { ImplicitPropsInterface } from "../../Utils/Hooks";
export interface ImageCarouselProps extends MainInterface, ResponsiveInterface, Omit<React.HTMLAttributes<HTMLUListElement>, 'onClick'>, ImplicitPropsInterface {
    imageData: string[];
    pointer?: boolean;
    onClick?: Function;
    hoverIcon?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    hoverOverlay?: boolean;
    hoverText?: string;
    altText: string;
    width?: number;
    height?: number;
}
export declare const ImageCarousel: React.FC<ImageCarouselProps>;
