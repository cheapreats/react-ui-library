import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
import { ImplicitPropsInterface } from "../../Utils/Hooks";
export interface ColorPickerProps extends MainInterface, ResponsiveInterface, ImplicitPropsInterface {
    value?: string;
    onChange?: Function;
}
export declare const ColorPicker: React.FC<ColorPickerProps>;
