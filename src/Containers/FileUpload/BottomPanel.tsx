import React, { forwardRef } from 'react';
import styled from 'styled-components'
import {Button as B} from '@Inputs/Button/Button'
import { Container, IContainerProps } from './StyledComponents';

interface IBottomPanelProps extends IContainerProps {
    children: React.ReactElement | undefined;
    isUploading:boolean;
    onCancelUploading:()=>void;
}

export const BottomPanel = forwardRef<HTMLDivElement, IBottomPanelProps>(
    ({ children,isUploading,onCancelUploading, ...props }, forwadedRef): React.ReactElement => (
        <Container {...props} ref={forwadedRef}>
            {children}
            {isUploading&&<Button onClick={onCancelUploading}>Cancel</Button>}
        </Container>
    ),
);

const Button=styled(B)`
position:relative;
top:30px;
z-index:99999;
`
