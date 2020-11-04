import React, { useState, useEffect } from 'react';
import {
    LabelLayout,
    LabelLayoutProps,
    InputFragment,
    InputFragmentProps,
} from '../Fragments';

const MINUS_SIGN = '-';
const EMPTY_STRING = '';
const MIN_LESS_THAN_ZERO = 0;
const ERROR_MESSAGE_VALUE_CALCUALTION = 1;
const VALIDATE_INPUT_FORMAT = /^-?[0-9]*$/gm;

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
        if (!targetValue.match(VALIDATE_INPUT_FORMAT)) {
            setIsError('Invalid Character');
        } else if (greaterThanMin && lessThanMax) {
            onRealValueChange(targetValue);
            setDisplayValue(targetValue);
        } else if (targetValue === MINUS_SIGN && min < MIN_LESS_THAN_ZERO) {
            onRealValueChange(targetValue);
            setDisplayValue(targetValue);
        } else if (Number.isNaN(targetValueInteger)) {
            onRealValueChange(EMPTY_STRING);
        } else {
            setDisplayValue(targetValue);
            const errorMessage = !greaterThanMin
                ? `greater than ${min - ERROR_MESSAGE_VALUE_CALCUALTION}`
                : `less than ${max + ERROR_MESSAGE_VALUE_CALCUALTION}`;
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
