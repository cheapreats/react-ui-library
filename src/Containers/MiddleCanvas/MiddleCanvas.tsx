import React from 'react';
import styled from 'styled-components'
import { DualSelectRadio } from './DualSelectRadio';
import { Template } from './Template';
import { DualSelectBar } from './DualSelectBar';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

export interface MiddleCanvasProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {

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
    ...props
}): React.ReactElement => {
    return (
        <Wrapper {...props}>
            <DualSelectBar
                leftSelectOption='Design'
                rightSelectOption='Preview'
            />
            <DualSelectRadio 
                caption='Before Receipt Prints'
                dualSelectOptions={PrinterOptions}
            />
            <Template 
                onDragEnd={() => console.log('I have been dragged!')}
            />
            <DualSelectRadio
                caption='After Receipt Prints'
                dualSelectOptions={PrinterOptions}
            />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    max-width: 500px;
`;