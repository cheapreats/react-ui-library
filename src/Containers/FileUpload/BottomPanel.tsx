import React, { forwardRef } from 'react';
import { Container, IContainerProps } from './StyledComponents';

interface IBottomPanelProps extends IContainerProps {
    children: React.ReactElement | undefined;
}

export const BottomPanel = forwardRef<HTMLDivElement, IBottomPanelProps>(
    ({ children, ...props }, forwadedRef): React.ReactElement => (
        <Container {...props} ref={forwadedRef}>
            {children}
        </Container>
    ),
);
