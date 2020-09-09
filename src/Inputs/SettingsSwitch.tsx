import React from 'react';
import styled from 'styled-components';
import { Paragraph } from '../Text';
import { Switch, SwitchProps } from './Switch';
import { flex } from '../Utils/Mixins';

interface SettingsSwitchProps extends SwitchProps {
    text?: string;
    type?: string;
    onSwitch?: Function;
    onSwitchValue?: any;
    flexDirection?: string;
    height?: string;
    width?: string;
    margin?: string;
    innerMargin?: string;
}

export const SettingsSwitch: React.FC<SettingsSwitchProps> = ({
    text,
    type,
    onSwitch = (): void => {},
    onSwitchValue,
    flexDirection,
    height,
    width,
    margin,
    innerMargin,
    ...props
}): React.ReactElement => {
    const onChangeFunction = (): void => onSwitch(onSwitchValue);

    return (
        <Row
            direction={flexDirection}
            height={height}
            width={width}
            margin={margin}
        >
            <Paragraph size={type || 'h5'} margin={innerMargin} bold>
                {text}
            </Paragraph>
            <Switch {...props} onChange={onChangeFunction} />
        </Row>
    );
};

interface RowProps {
    direction?: string;
    height?: string;
    width?: string;
    margin?: string;
}

const Row = styled.div<RowProps>`
    ${(props): string => `
         ${flex(props.direction || 'space-between')};
         height: ${props.height};
         width: ${props.width};
         margin: ${props.margin};
    `};
`;
