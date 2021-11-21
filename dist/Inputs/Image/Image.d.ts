import React from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
import { ImplicitPropsInterface } from "../../Utils/Hooks";
export interface ImageProps extends MainInterface, ResponsiveInterface, ImplicitPropsInterface {
    accept?: string;
    aspect?: number;
    onImageReturn?: Function;
    drawImage?: Function;
}
export declare const Image: React.FC<ImageProps>;
export default Image;
