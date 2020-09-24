import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { MainInterface, ResponsiveInterface } from '../Utils/BaseStyles';
import { ImplicitPropsInterface } from '../Utils/Hooks';
import { Button } from './Button';

export interface ColorPickerProps
    extends MainInterface,
        ResponsiveInterface,
        ImplicitPropsInterface {
    value?: string;
    onChange?: Function;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
    value = undefined,
    onChange = (): void => {
        return undefined;
    },
    ...props
}): React.ReactElement => {
    const [cardColor, setColor] = useState(value);
    const colorRef = useRef<HTMLInputElement>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setColor(e.target.value);
        onChange(e);
    };
    return (
        <>
            <Button
                loading={!value}
                {...props}
                onClick={(): void => {
                    if (colorRef.current) {
                        colorRef.current.click();
                    }
                }}
            >
                <ColorInput
                    {...props}
                    ref={colorRef}
                    type="color"
                    value={cardColor}
                    onChange={handleChange}
                />
            </Button>
        </>
    );
};

const ColorInput = styled.input`
    border: none;
    width: 30px;
    height: 30px;
    padding: 0;
    cursor: pointer;
    background-color: transparent;
    -webkit-appearance: none;
    ::-webkit-color-swatch-wrapper {
        border-radius: 50%;
        padding: 0;
    }
    ::-webkit-color-swatch {
        border-radius: 50%;
        padding: 0;
    }
`;
