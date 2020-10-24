import React, { useState } from 'react';
import styled from 'styled-components'
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';

export interface TemplateProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    placeholder?: string,
    headerSpacingStyle?: string,
};


export const Template: React.FC<TemplateProps> = ({
    ...props
}): React.ReactElement => {
    return (
        <Wrapper {...props}>
            hello 
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 384px;
    height: 1177px;
    border: dotted 0.5px #4a4a4a;
    background-color: #ffffff;
    margin-top: 5vh;
`;