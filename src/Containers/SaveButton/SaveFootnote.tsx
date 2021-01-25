import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Mixins } from '@Utils';
import { Button as B, ButtonProps } from '@Inputs/Button/Button';
import { Footnote as F } from '@Containers/Footnote/Footnote';
import { SmallText } from '@Text';
import { Check } from '@styled-icons/fa-solid/Check';

const HOVER_MESSAGE_TRANSITION_TIME = 0.3;

export interface SaveButtonProps extends ButtonProps {
    show?: boolean;
    action?: React.MouseEventHandler;
    loading?: boolean;
    buttonText?: string;
    icon?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    disabled?: boolean;
    disabledMessage?: string;
}

export const SaveButton: React.FC<SaveButtonProps> = ({
    show,
    action,
    loading,
    buttonText = 'Submit',
    icon = Check,
    disabled,
    disabledMessage,
    children,
    ...props
}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const handleHover = useCallback(
        (value: boolean) => {
            if (disabled && disabledMessage) {
                setIsHovered(value);
            }
        },
        [disabled, disabledMessage],
    );

    return (
        <Footnote padding='10px' show={show} position='absolute'>
            {children}
            <HoverDetectDiv
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
                disabled={disabled}
            />
            <Button
                icon={icon}
                onClick={action}
                primary
                disabled={disabled}
                loading={loading}
                {...props}
            >
                {loading ? null : buttonText}
            </Button>
            <HoverDisplay isHovered={isHovered}>
                <SmallText color='background' size='medium' bold>
                    {disabledMessage}
                </SmallText>
            </HoverDisplay>
        </Footnote>
    );
};
const Footnote = styled(F)`
    ${Mixins.flex('space-between', 'center')}
`;
const Button = styled(B)`
    margin: auto 0 auto auto;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.2) 0 1px 3px;
`;
interface IHoverDisplayProps {
    isHovered: boolean;
}
const HoverDisplay = styled.div<IHoverDisplayProps>`
    width: 225px;
    height: 50px;
    border-radius: 10px;
    z-index: 99;
    position: fixed;
    opacity: 0;
    right: 20px;
    bottom: 70px;
    padding: 5px;
    display: none;
    ${Mixins.transition(['opacity'], HOVER_MESSAGE_TRANSITION_TIME)}
    ${({ isHovered, theme }) => `
        background-color: ${theme.colors.primary};
        ${
    isHovered &&
            `
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0.9;`
}  
    `}
`;
interface IHoverDetectDiv {
    disabled?: boolean;
}
const HoverDetectDiv = styled.div<IHoverDetectDiv>`
    ${Mixins.position('absolute', 0, 'auto', 0, 0, 'auto')};
    ${({ disabled }) => `
        ${disabled && 'z-index: 99;'}
    `}
    opacity:0;
    width: 10%;
    height: 100%;
`;
