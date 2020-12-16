import React, { useState, useEffect } from 'react';
import {
    LabelLayout,
    LabelLayoutProps,
    InputFragment,
    InputFragmentProps,
} from '@Layouts';

const MINUS_SIGN = '-';
const MIN_LESS_THAN_ZERO = 0;
const ERROR_MESSAGE_VALUE_CALCUALTION = 1;
const VALIDATE_INPUT_FORMAT = /^-?[0-9]*$/gm;

export enum MaskedInputPreset {
    DOLLAR = 'DOLLAR',
    PERCENTAGE = 'PERCENTAGE',
}

export interface MaskedInputProps extends LabelLayoutProps, InputFragmentProps {
    realValue: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    mask: MaskedInputPreset | ((value: string) => string);
    min?: number;
    max?: number;
}

export const MaskedInput: React.FC<MaskedInputProps> = ({
    mask,
    realValue,
    onChange,
    min = 0,
    max = 100,
    ...props
}): React.ReactElement => {
    const [displayValue, setDisplayValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isError, setIsError] = useState<boolean | string>(false);

    const DOLLAR_FORMAT_MASK = (s: string): string => {
        const number = parseInt(s, 10);
        if (Number.isNaN(number)) {
            setIsError('Value cannot be empty');
            return '';
        }
        if (number < 0) {
            return `-$${-number.toFixed(2)}`;
        }
        return `$${number.toFixed(2)}`;
    };

    const PERCENT_FORMAT_MASK = (s: string): string => {
        const number = parseInt(s, 10);
        if (Number.isNaN(number)) {
            setIsError('Value cannot be empty');
            return '';
        }
        if (number < 0) {
            return `-${-number.toFixed(0)}%`;
        }
        return `${number.toFixed(0)}%`;
    };

    const getMaskFunction_ = (
        maskInputPreset: MaskedInputPreset | ((value: string) => string),
    ): ((value: string) => string) => {
        switch (maskInputPreset) {
            case MaskedInputPreset.DOLLAR:
                return DOLLAR_FORMAT_MASK;
            case MaskedInputPreset.PERCENTAGE:
                return PERCENT_FORMAT_MASK;
            default:
                return mask as (value: string) => string;
        }
    };

    const inputValidator = (event: React.ChangeEvent<HTMLInputElement>) => {
        const targetValue = event.target.value;
        const targetValueInteger = parseFloat(targetValue);
        const greaterThanMin = targetValueInteger >= min;
        const lessThanMax = targetValueInteger <= max;

        setIsError(false);
        if (!targetValue.match(VALIDATE_INPUT_FORMAT)) {
            setIsError('Invalid Character');
        } else if (greaterThanMin && lessThanMax) {
            onChange(event);
            setDisplayValue(targetValue);
        } else if (targetValue === MINUS_SIGN && min < MIN_LESS_THAN_ZERO) {
            onChange(event);
            setDisplayValue(targetValue);
        } else if (Number.isNaN(targetValueInteger)) {
            onChange(event);
        } else {
            setDisplayValue(targetValue);
            onChange(event);
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
                        inputValidator(e);
                    }
                }}
                {...props}
            />
        </LabelLayout>
    );
};

export default MaskedInput;
