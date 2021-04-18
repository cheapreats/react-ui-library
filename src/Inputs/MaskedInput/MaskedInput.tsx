import React, { useEffect, useState } from 'react';
import {
    InputFragment,
    InputFragmentProps,
    LabelLayout,
    LabelLayoutProps,
} from '@Layouts';
import InputMask, {
    BeforeMaskedStateChangeStates,
    InputState,
} from 'react-input-mask';

const MATCH_NON_INPUT_VALUES = /[^0-9A-Za-z]/gm;
const REPLACE_CHARACTERS_WITH_EMPTY_STRING = '';
const MASK_SYMBOL = 1;
const NON_NEGATIVE_NUMBER = 0;
const FIRST_INDEX = 0;
const DECIMAL_PLACE = 10;
const ZERO_STRING = '0';

export enum MaskedInputPreset {
    DOLLAR = '$999.99',
    PERCENTAGE = '999%',
    PHONE = '1(999)999-9999',
}

export interface MaskedInputProps extends LabelLayoutProps, InputFragmentProps {
    realValue: number | string;
    onInputChange: (value: any) => void;
    customInputFormat?: (value: string) => string;
    mask: MaskedInputPreset;
    fillInput?: string;
    isWithoutMaskCharacters?: boolean;
}

export const MaskedInput: React.FC<MaskedInputProps> = ({
    mask,
    realValue,
    onInputChange,
    error,
    fillInput = '0',
    disabled,
    ...props
}): React.ReactElement => {
    const [isError, setIsError] = useState<boolean | string>(false);

    useEffect(() => {
        if (error) {
            setIsError(error);
        } else {
            setIsError(false);
        }
    }, [error]);

    // string no mask values
    const phoneMaskFilter = (value: string | number): string => {
        const realValueToString = value.toString();
        return realValueToString;
    };

    const numberMaskFilter = (
        value: number | string,
        maskInputPreset: MaskedInputPreset,
    ) => {
        const realValueToString = value.toString();
        const zeroesToAdd =
            maskInputPreset.length - realValueToString.length - MASK_SYMBOL;
        if (zeroesToAdd < NON_NEGATIVE_NUMBER) {
            const modifiedStringValue = realValueToString.slice(
                FIRST_INDEX,
                zeroesToAdd,
            );
            return modifiedStringValue;
        }
        const zerosToPrefix = ZERO_STRING.repeat(zeroesToAdd);
        return `${zerosToPrefix}${realValueToString}`;
    };

    const getMaskFunction = (maskInputPreset: MaskedInputPreset): string => {
        switch (maskInputPreset) {
            case MaskedInputPreset.DOLLAR:
                return numberMaskFilter(realValue, MaskedInputPreset.DOLLAR);
            case MaskedInputPreset.PERCENTAGE:
                return numberMaskFilter(
                    realValue,
                    MaskedInputPreset.PERCENTAGE,
                );
            case MaskedInputPreset.PHONE:
                return phoneMaskFilter(realValue);
            default:
                return realValue.toString();
        }
    };

    /**
     * Determines format of return value
     * Sets the new real value
     *
     *@param {React.ChangeEvent<HTMLInputElement>} event
     * */
    const onMaskedInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { value } = event.target;
        let valueWithoutMask: string | number = value.replace(
            MATCH_NON_INPUT_VALUES,
            REPLACE_CHARACTERS_WITH_EMPTY_STRING,
        );
        if (mask !== MaskedInputPreset.PHONE) {
            valueWithoutMask = parseInt(valueWithoutMask, DECIMAL_PLACE);
        }
        onInputChange(valueWithoutMask);
    };

    /**
     * Formatted Mask Value passed to onMaskedInputchange
     * Prevents having incomplete values
     * ie: 10.0
     * nextState value will always be complete input
     *@param {InputState} nextState - the state after the mask is applied
     * */
    const beforeMaskedStateChange = ({
        nextState,
    }: BeforeMaskedStateChangeStates): InputState => ({
        value: nextState.value,
        selection: nextState.selection,
    });

    return (
        <LabelLayout {...props} error={isError}>
            <InputMask
                mask={mask}
                value={getMaskFunction(mask)}
                onChange={onMaskedInputChange}
                beforeMaskedStateChange={beforeMaskedStateChange}
                maskPlaceholder={fillInput}
                disabled={disabled}
            >
                <InputFragment error={isError} {...props} />
            </InputMask>
        </LabelLayout>
    );
};

export default MaskedInput;
