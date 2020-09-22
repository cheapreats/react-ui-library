import React from 'react';
import styled from 'styled-components';

export const ListFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    children,
    ...props
}): React.ReactElement => <Footer {...props}>{children}</Footer>;

const Footer = styled.div`
    padding: 10px 20px;
    margin-top: auto;
`;
