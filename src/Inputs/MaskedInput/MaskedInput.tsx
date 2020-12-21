import React, { useState, useEffect } from 'react';
import {
    LabelLayout,
    LabelLayoutProps,
    InputFragment,
    InputFragmentProps,
} from '@Layouts';

const MINUS_SIGN = '-';
const MIN_LESS_THAN_ZERO = 0;
const MASK_LESS_THAN_ZERO = 0;
const FIRST_CHARACTER = 0;
const SECOND_CHARACTER = 1;
const FIX_NUMBER_TO_TWO_DECIMALS = 2;
const ERROR_MESSAGE_VALUE_CALCULATION = 1;
const DASH_TO_SEPERATE_PHONE_DIGITS = '-';
const VALIDATE_INPUT_FORMAT = /^[+-]?(?:\d*\.)?\d+$/gm;
const PHONE_NUMBER_MATCH = /(?:(?=\d{1,4}$)\d{1,4}$|\d{1,3})/gm;

export enum MaskedInputPreset {
    DOLLAR = 'DOLLAR',
    PERCENTAGE = 'PERCENTAGE',
    PHONE = 'PHONE',
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
    error,
    ...props
}): React.ReactElement => {
    const [displayValue, setDisplayValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isError, setIsError] = useState<boolean | string>(false);

    useEffect(() => {
        if (error) {
            setIsError(error);
        }
    }, [error]);

    const DOLLAR_FORMAT_MASK = (s: string): string => {
        const number = parseFloat(s);
        if (Number.isNaN(number)) {
            setIsError('Value cannot be empty');
            return '';
        }
        if (number < MASK_LESS_THAN_ZERO) {
            return `-$${-number.toFixed(FIX_NUMBER_TO_TWO_DECIMALS)}`;
        }
        return `$${number.toFixed(FIX_NUMBER_TO_TWO_DECIMALS)}`;
    };

    const PERCENT_FORMAT_MASK = (s: string): string => {
        const number = parseFloat(s);
        if (Number.isNaN(number)) {
            setIsError('Value cannot be empty');
            return '';
        }
        if (number < MASK_LESS_THAN_ZERO) {
            return `-${-number.toFixed(FIX_NUMBER_TO_TWO_DECIMALS)}%`;
        }
        return `${number.toFixed(FIX_NUMBER_TO_TWO_DECIMALS)}%`;
    };

    const PHONE_FORMAT_MASK = (s: string): string => {
        const firstDigit = s.slice(FIRST_CHARACTER, SECOND_CHARACTER);
        const phoneNumberToMatch = s.slice(SECOND_CHARACTER);
        const phoneNumberFormat = phoneNumberToMatch.match(PHONE_NUMBER_MATCH);
        if (phoneNumberFormat) {
            return `${firstDigit}-${phoneNumberFormat.join(
                DASH_TO_SEPERATE_PHONE_DIGITS,
            )}`;
        }
        if (firstDigit) {
            return `${firstDigit}`;
        }
        return '';
    };

    const getMaskFunction_ = (
        maskInputPreset: MaskedInputPreset | ((value: string) => string),
    ): ((value: string) => string) => {
        switch (maskInputPreset) {
            case MaskedInputPreset.DOLLAR:
                return DOLLAR_FORMAT_MASK;
            case MaskedInputPreset.PERCENTAGE:
                return PERCENT_FORMAT_MASK;
            case MaskedInputPreset.PHONE:
                return PHONE_FORMAT_MASK;
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
        onChange(event);

        if (!targetValue.match(VALIDATE_INPUT_FORMAT)) {
            setIsError('Invalid characters or input');
        } else if (greaterThanMin && lessThanMax) {
            setDisplayValue(targetValue);
        } else if (targetValue === MINUS_SIGN && min < MIN_LESS_THAN_ZERO) {
            setDisplayValue(targetValue);
        } else {
            setDisplayValue(targetValue);
            if (min && !greaterThanMin) {
                setIsError(
                    `Value must be greater than ${
                        min - ERROR_MESSAGE_VALUE_CALCULATION
                    }`,
                );
            } else if (max) {
                setIsError(
                    `Value must be less than ${
                        max + ERROR_MESSAGE_VALUE_CALCULATION
                    }`,
                );
            }
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
