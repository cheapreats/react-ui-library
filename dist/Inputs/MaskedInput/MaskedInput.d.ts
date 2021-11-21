import React from 'react';
import { InputFragmentProps, LabelLayoutProps } from "../../Fragments";
export declare enum MaskedInputPreset {
    DOLLAR = "$999.99",
    PERCENTAGE = "999%",
    PHONE = "1(999)999-9999"
}
export interface MaskedInputProps extends LabelLayoutProps, InputFragmentProps {
    realValue: number | string;
    onInputChange: (value: any) => void;
    customInputFormat?: (value: string) => string;
    mask: MaskedInputPreset;
    fillInput?: string;
    isWithoutMaskCharacters?: boolean;
}
export declare const MaskedInput: React.FC<MaskedInputProps>;
export default MaskedInput;
