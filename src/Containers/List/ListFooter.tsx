import React from 'react';
import styled from 'styled-components';

interface ListFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    padding?: string;
}

export const ListFooter: React.FC<ListFooterProps> = ({
    padding = '10px 20px',
    children,
    ...props
}): React.ReactElement => (
    <Footer {...props} padding={padding}>
        {children}
    </Footer>
);

const Footer = styled.div<ListFooterProps>`
    margin-top: auto;
    ${({ theme, padding }): string => `
    border-top: 2px solid ${theme.colors.text}20;
    padding: ${padding};
`}
`;
