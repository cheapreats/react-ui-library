import React, { useState } from 'react';
import styled from 'styled-components'
import { DualSelectRadio } from './DualSelectRadio';
import { Template } from './Template';
import { DualSelectBar } from './DualSelectBar';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

export interface MiddleCanvasProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    leftSelectOption: string,
    rightSelectOption: string,
};

export const PrinterOptions = {
    LIGHT: {
        title: 'Light',
        labels: ['Flash Once', 'Flash Twice']
    },
    SOUND: {
        title: 'Sound',
        labels: ['Beep Once', 'Beep Twice']
    }
};

export const MiddleCanvas: React.FC<MiddleCanvasProps> = ({
    leftSelectOption = 'Design',
    rightSelectOption = 'Preview',
    ...props
}): React.ReactElement => {
    const [selectedOption, setSelectedOption] = useState(leftSelectOption);

    return (
        <Wrapper {...props}>
            <DualSelectBar
                leftSelectOption={leftSelectOption}
                rightSelectOption={rightSelectOption}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
            />
            <DualSelectRadio 
                caption='Before Receipt Prints'
                dualSelectOptions={PrinterOptions}
            />
            <Template 
                onDragEnd={() => console.log('I have been dragged!')}
                selectedOption={selectedOption}
            />
            <DualSelectRadio
                caption='After Receipt Prints'
                dualSelectOptions={PrinterOptions}
            />
        </Wrapper>
    );
}

const Wrapper = styled.div``;