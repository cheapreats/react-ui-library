import React from 'react';
import styled from 'styled-components';
import { position, darken, flex, transition } from '../Utils/Mixins';


export interface SwitchProps extends InputProps {
    leftTag?:string;
    rightTag?:string;
    activeColor?:string;
    switchColor?:string;
    label?:string;
    description?:string;
}

interface InputProps {
    isChecked?: boolean;
    onChange?: Function;
    disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
    leftTag,
    rightTag,
    activeColor,
    switchColor,
    onChange = (): void => {},
    isChecked,
    label,
    description,
    disabled
}): React.ReactElement => (
    <Container>
        <Layout>
            <Label>{label}</Label>
            <Info>{description}</Info>
        </Layout>
        <Row>
            {leftTag && <Tag margin="5px 10px 0 0">{leftTag}</Tag>}
            <Container>
                <Input
                    type="checkbox"
                    onChange={(e): void => onChange(e)}
                    checked={isChecked}
                    disabled={disabled}
                />
                <SwitchBox activeColor={activeColor} switchColor={switchColor}>
                    <SwitchDot />
                </SwitchBox>
            </Container>
            {rightTag && <Tag margin="5px 0 0 10px">{rightTag}</Tag>}
        </Row>
    </Container>
);

interface TagProps{
    margin:string;
}
const Tag = styled.label<TagProps>`
    margin: ${(props): string => props.margin};
    font-weight: bold;
    font-size: 0.85rem;
`;

const Container = styled.div`
    position: relative;
    overflow: hidden;
`;

const Row = styled.div`
    ${flex('row')}
`;

const Input = styled.input<InputProps>`
    ${position('absolute', 50, 0)}
    opacity: 0;
    z-index: 1;
    cursor: pointer;
    ${({ theme }): string => `
    width: ${theme.dimensions.switch.size * 2}px;
    height: ${theme.dimensions.switch.size}px;
    `}
    ${transition(['background-color'])}
    &:disabled {
        cursor: not-allowed;
`;

const SwitchBox = styled.div<SwitchProps>`
    ${flex('flex-start', 'center')};
    box-sizing: border-box;
    border-radius:999px;
    ${({ theme, activeColor }): string => `
        background-color: ${darken(theme.colors.input.default, 0.05)};
        padding: ${theme.dimensions.switch.spacing}px;
        width: ${theme.dimensions.switch.size * 2}px;
        height: ${theme.dimensions.switch.size}px;
        ${Input}:checked ~ & {
            background-color:${activeColor || theme.colors.primary};
        }
    `}

    // Disabled
    ${Input}:disabled ~ & {
        opacity: 0.6;
    }
    
    ${({ switchColor }): string =>
        switchColor ? `
        background-color:${switchColor};` : ''}
`;
const Layout = styled.div`
    ${transition(['opacity'])}
    ${flex('column')}
`;
const Label = styled.label`
    font-size: 0.9rem;
    font-weight: bold;
`;

const Info = styled.span`
    font-size: 0.9rem;
    font-weight: bold;
    opacity: 0.7;
    margin: 0 0 5px;
`;
const SwitchDot = styled.div`
    ${transition(['transform'])}
    border-radius: 50%;
    background-color: white;
    ${({ theme }): string => {
        const { size, spacing } = theme.dimensions.switch;
        const dotSize = size - spacing * 1.5;
        return `
            width: ${dotSize}px;
            height: ${dotSize}px;

            ${Input}:checked ~ ${SwitchBox} & {
                transform:
                    translate3d(100%, 0, 0)
                    translate3d(${spacing}px, 0, 0)
                ;
            }
        `;
    }}
`;

export default Switch;
