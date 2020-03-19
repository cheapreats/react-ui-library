import React, { useState, useEffect } from 'react';
import { LabelLayout, LabelLayoutProps, InputFragment } from '@Layouts';

export interface MaskedInputProps extends LabelLayoutProps {
    disabled?: boolean;
    placeholder?: string;
    realValue: string;
    onRealValueChange: (value: string) => void;
    mask: (value: string) => string;
}

export const MaskedInput: React.FC<MaskedInputProps> = ({
    mask,
    realValue,
    onRealValueChange,
    ...props
}): React.ReactElement => {
    const [displayValue, setDisplayValue] = useState(mask(realValue));
    const [isFocused, setIsFocused] = useState(false);

    useEffect((): void => {
        if (isFocused) {
            setDisplayValue(realValue);
        } else {
            setDisplayValue(mask(realValue));
        }
    }, [realValue]);

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
                    setDisplayValue(mask(realValue));
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
