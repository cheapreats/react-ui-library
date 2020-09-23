import React, { useState, useEffect } from 'react';
import { LabelLayout, LabelLayoutProps, InputFragment } from '../Fragments';

export enum MaskedInputPreset {
    DOLLAR = 'DOLLAR',
    PERCENTAGE = 'PERCENTAGE',
}

export interface MaskedInputProps
    extends LabelLayoutProps,
        React.InputHTMLAttributes<HTMLInputElement> {
    realValue: string;
    onRealValueChange: (value: string) => void;
    mask: MaskedInputPreset | ((value: string) => string);
}

const DOLLAR_FORMAT_MASK = (s: string): string => {
    const number = +s;
    if (Number.isNaN(number)) {
        return 'Invalid value.';
    }
    if (number < 0) {
        return `-$${-number.toFixed(2)}`;
    }
    return `$${number.toFixed(2)}`;
};

const PERCENT_FORMAT_MASK = (s: string): string => {
    const number = +s;
    if (Number.isNaN(number)) {
        return 'Invalid value.';
    }
    if (number < 0) {
        return `-${-number.toFixed(0)}%`;
    }
    return `${number.toFixed(0)}%`;
};

const getMaskFunction_ = (
    mask: MaskedInputPreset | ((value: string) => string),
): ((value: string) => string) => {
    switch (mask) {
        case MaskedInputPreset.DOLLAR:
            return DOLLAR_FORMAT_MASK;
        case MaskedInputPreset.PERCENTAGE:
            return PERCENT_FORMAT_MASK;
        default:
            return mask as (value: string) => string;
    }
};

export const MaskedInput: React.FC<MaskedInputProps> = ({
    mask,
    realValue,
    onRealValueChange,
    ...props
}): React.ReactElement => {
    const [displayValue, setDisplayValue] = useState(
        getMaskFunction_(mask)(realValue),
    );
    const [isFocused, setIsFocused] = useState(false);

    useEffect((): void => {
        if (isFocused) {
            setDisplayValue(realValue);
        } else {
            setDisplayValue(getMaskFunction_(mask)(realValue));
        }
    }, [realValue, mask]);

    return (
        <LabelLayout {...props}>
            <InputFragment
                value={displayValue}
                onFocus={(): void => {
                    setIsFocused(true);
                    setDisplayValue(realValue);
                }}
                onBlur={(): void => {
                    setIsFocused(false);
                    setDisplayValue(getMaskFunction_(mask)(realValue));
                }}
                onChange={(e): void => {
                    if (isFocused) {
                        onRealValueChange(e.target.value);
                    }
                }}
                {...props}
            />
        </LabelLayout>
    );
};

export default MaskedInput;
