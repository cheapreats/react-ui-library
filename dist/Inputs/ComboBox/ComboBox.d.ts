import React from 'react';
import { LabelLayoutProps } from "../../Fragments";
export interface ComboBoxSelectorProps extends LabelLayoutProps {
    value?: string | number;
    onChange?: Function;
    limit?: number;
    placeholder?: string;
}
export declare const ComboBox: React.FC<ComboBoxSelectorProps>;
export default ComboBox;
