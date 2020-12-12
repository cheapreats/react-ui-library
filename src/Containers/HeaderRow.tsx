import React from 'react';
import styled from 'styled-components';
import { Heading, HeadingProps } from '../Text';
import { flex } from '../Utils/Mixins';

interface HeaderProps {
    padding?: string;
    width?: number;
}

interface RowProps {
    display?: string;
}

export interface HeaderRowProps {
    label: string;
    display?: string;
    type?: string;
    padding?: string;
    width?: number;
    size?: string;
}

export const HeaderRow: React.FC<HeaderRowProps> = ({
    label,
    display,
    type,
    padding,
    width,
    size,
    children,
    ...props
}): React.ReactElement => (
    <Header padding={padding} width={width} {...props}>
        <Row display={display}>
            <Heading bold type={type} size={size}>
                {label}
            </Heading>
            {children}
        </Row>
    </Header>
);

const Header = styled.div<HeaderProps>`
    padding: ${(props): string => props.padding || '10px 10px'};
    width: ${(props): number | undefined => props.width}px;
`;

const Row = styled.div<RowProps>`
    ${(props): string => flex(props.display)};
`;
