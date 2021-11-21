import React from 'react';
import { LabelLayoutProps } from "../../Fragments";
export interface TextareaProps extends LabelLayoutProps {
    disabled?: boolean;
    placeholder?: string;
    value?: string;
    rows: string | number;
    onChange: any;
}
export declare const Textarea: React.FC<TextareaProps>;
export default Textarea;
