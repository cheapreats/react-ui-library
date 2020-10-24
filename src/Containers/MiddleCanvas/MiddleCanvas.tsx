import React from 'react';
import styled from 'styled-components'
import { DualSelect } from './DualSelect';
import { Template } from './Template';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

export interface MiddleCanvasProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {

};

export const MiddleCanvas: React.FC<MiddleCanvasProps> = ({
    ...props
}): React.ReactElement => {
    return (
        <Wrapper {...props}>
            <DualSelect 
                caption='Before Receipt Prints'
            />
            <Template />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    max-width: 500px;
`;