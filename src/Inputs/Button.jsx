import React, { useState, useEffect } from 'react';
import { CircleNotch } from 'styled-icons/fa-solid/CircleNotch';
import { Main, Responsive } from '../Utils/BaseStyles';
import { transition, clickable, position, flex } from '../Utils/Mixins';
import styled from 'styled-components';

const DELAY = 100;

const Button = ({ children, icon, loading, ...props }) => {
    const [ _loading, setLoading ] = useState(loading);
    useEffect(() => {
        window.setTimeout(() => setLoading(loading), DELAY);
    }, [ loading !== _loading ]);
    return (
        <StyledButton { ...props }>
            { icon && <Icon as={ icon }/> }
            <Content loading={ _loading }>{ children }</Content>
            { loading && <Loader loading={ _loading }/> }
        </StyledButton>
    );
}

const StyledButton = styled.button`
    // Base Styles
    ${ transition(['background-color', 'opacity']) }
    ${ Responsive }
    ${ Main }

    ${ flex('center') }
    border: 1.5px solid rgba(0,0,0,0.1);
    background: transparent;
    border-radius: 999px;
    padding: 10px 18px;
    font-size: 0.95rem;
    position: relative;
    font-weight: bold;
    overflow: hidden;
    cursor: pointer;
    outline: none;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }

    // Theme Stuff
    ${({ theme }) => `
        font-family: ${ theme.font.family };
        color: ${ theme.colors.text };
        ${ clickable('#ffffff', 0.05) }
    `}

    // Primary button
    ${({ primary, theme }) => primary ? `
        background-color: ${ theme.colors.primary };
        color: white;
        ${ clickable(theme.colors.primary) }
    ` : ''}

    // Full width
    ${({ full }) => full ? 'width: 100%;' : ''}
`;

const Icon = styled.svg`
    width: 14px;
    height: 14px;
    margin-right: 8px;
`;

const Content = styled.span`
    ${ transition(['transform', 'opacity']) }
    ${({ loading }) => loading ? `
        transform: translate3d(0,80%,0);
        opacity: 0;
    ` : `
        transform: translate3d(0,0,0);
        opacity: 1;
    `}
`;

const Loader = styled(CircleNotch)`
    ${ transition(['opacity']) }
    ${ position() }

    animation: spin 1s linear 0s infinite;
    height: 14px;
    width: 14px;
    opacity: 0;

    @keyframes spin {
        from { transform: rotate(0deg) }
        to { transform: rotate(360deg) }
    }

    ${({ loading }) => loading ? `
        opacity: 1;
    ` : ''}
`;

export default Button;