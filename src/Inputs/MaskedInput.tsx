import React, { useState, useEffect } from 'react';
import {
    LabelLayout,
    LabelLayoutProps,
    InputFragment,
    InputFragmentProps,
} from '../Fragments';

const MINUS_SIGN = '-';
const EMPTY_STRING = '';

export enum MaskedInputPreset {
    DOLLAR = 'DOLLAR',
    PERCENTAGE = 'PERCENTAGE',
}

export interface MaskedInputProps extends LabelLayoutProps, InputFragmentProps {
    realValue: string;
    onRealValueChange: (value: string) => void;
    mask: MaskedInputPreset | ((value: string) => string);
    min?: number;
    max?: number;
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
    min = 0,
    max = 100,
    ...props
}): React.ReactElement => {
    const [displayValue, setDisplayValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isError, setIsError] = useState<boolean | string>(false);

    const inputValidator = (targetValue: string) => {
        const targetValueInteger = parseFloat(targetValue);
        const greaterThanMin = targetValueInteger >= min;
        const lessThanMax = targetValueInteger <= max;

        setIsError(false);
        if (greaterThanMin && lessThanMax) {
            onRealValueChange(targetValue);
            setDisplayValue(targetValue);
        } else if (targetValue === MINUS_SIGN && min < 0) {
            onRealValueChange(targetValue);
            setDisplayValue(targetValue);
        } else if (Number.isNaN(targetValueInteger)) {
            onRealValueChange(EMPTY_STRING);
        } else {
            const errorMessage = !greaterThanMin
                ? `greater than ${min - 1}`
                : `less than ${max + 1}`;
            setIsError(`Value must be ${errorMessage}`);
        }
    };

    useEffect((): void => {
        if (isFocused) {
            setDisplayValue(realValue);
        } else {
            setDisplayValue(getMaskFunction_(mask)(realValue));
        }
    }, [realValue, mask]);

    return (
        <LabelLayout {...props} error={isError}>
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
                        inputValidator(e.target.value);
                    }
                }}
                {...props}
            />
        </LabelLayout>
    );
};

export default MaskedInput;
