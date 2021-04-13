import React, { useEffect, useState } from 'react';
import {
    InputFragment,
    InputFragmentProps,
    LabelLayout,
    LabelLayoutProps,
} from '@Layouts';
import InputMask, {BeforeMaskedStateChangeStates, InputState} from 'react-input-mask';

const MATCH_NON_NUMBER_VALUES = /[^0-9]/gm;
const REPLACE_CHARACTERS_WITH_EMPTY_STRING = '';
const PARSE_DECIMAL_PLACE = 10;
const EMPTY_INPUT_ZERO_VALUE = 0;

export interface MaskedInputProps extends LabelLayoutProps, InputFragmentProps {
    realValue: number | string;
    onInputChange: (value: number| string) => void;
    mask: string;
    isInputValueNumber?: boolean;
    customInputFormat?: (nextState: string) => string;
    fillInput?: string;
}

export const MaskedInput: React.FC<MaskedInputProps> = ({
    mask = '$99.99',
    realValue,
    onInputChange,
    error,
    customInputFormat,
    isInputValueNumber,
    fillInput = '0',
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

    /**
     * Determines format of return value
     * Sets the new real value
     * 
    *@param {React.ChangeEvent<HTMLInputElement>} event
    * */
    const onMaskedInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        let newRealValue: string | number = value;
        if (isInputValueNumber) {
            // strip all non number mask values
            // parseInt removing trailing zeroes
            const maskedInputValueNumber = parseInt(value.replace(MATCH_NON_NUMBER_VALUES, REPLACE_CHARACTERS_WITH_EMPTY_STRING), PARSE_DECIMAL_PLACE);
            newRealValue = maskedInputValueNumber || EMPTY_INPUT_ZERO_VALUE;
        } else if (customInputFormat) {
            newRealValue = customInputFormat(value);
        }
        onInputChange(newRealValue);
    }

    /**
     * Formatted Mask Value passed to onMaskedInputchange
     * Prevents having incomplete values
     * ie: 10.0
     * nextState value will always be complete input
    *@param {InputState} nextState - the state after the mask is applied
    * */
    const beforeMaskedStateChange = ({nextState}: BeforeMaskedStateChangeStates): InputState => ({
        value: nextState.value,
        selection: nextState.selection
    })
    
    return (
        <LabelLayout {...props} error={isError}>
            <InputMask 
                mask={mask}
                value={realValue.toString()}
                onChange={onMaskedInputChange}
                beforeMaskedStateChange={beforeMaskedStateChange}
                maskPlaceholder={fillInput}
            >
                <InputFragment
                    error={isError}
                    {...props}
                    
                />
            </InputMask>
        </LabelLayout>
    );
};

export default MaskedInput;
