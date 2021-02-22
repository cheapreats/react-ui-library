import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Heading as H, HeadingProps } from '../../Text';
import { Mixins } from '../../Utils';

interface _NavigationHeaderProps extends HeadingProps {
    label?: string;
    logo?: string;
}

export interface NavigationHeaderProps {
    label?: string;
    logo?: string;
}

export const NavigationHeader: React.FC<_NavigationHeaderProps> = ({
    label,
    logo,
    ...props
}): React.ReactElement =>{
    const theme = useTheme();
    return (
        <Header>
            <Logo src={logo || theme.logo} />
            <Heading
                lineHeight="1.2"
                size="1.1rem"
                color="white"
                margin="6px auto 0 0px"
                padding="0 12px 0 0"
                bold
                {...props}
            >
                {label}
            </Heading>
        </Header>
    );
} 

const Header = styled.div`
    ${Mixins.flex('center')}
    padding: 0 8px;
`;

const Logo = styled.img`
    width: 46px;
    margin: 0 4px;
    height: auto;
`;

const Heading = styled(H)`
    ${Mixins.transition(['max-width', 'margin', 'padding', 'opacity'])}
    max-width: 255px;
    overflow: hidden;
    ${Mixins.media(
        'tablet',
        `
        max-width: 0;
        opacity: 0;
        padding: 0;
        margin: 0;
    `,
    )}
`;
