import React from 'react';
import styled from 'styled-components';
import { BaseStyles } from '@Utils';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import { Paragraph, SmallText } from '@Text';

export interface DisplayItemProps extends MainInterface, ResponsiveInterface {
    label?: string;
    value?: string;
}

export const DisplayItem: React.FC<DisplayItemProps> = ({
    label,
    value,
    ...props
}): React.ReactElement => (
    <Item {...props}>
        <SmallText lineHeight="1" size="0.9rem" bold>
            {label}
        </SmallText>
        <Text color="grey" bold>
            {value}
        </Text>
    </Item>
);

const Item = styled.div`
    ${(props): string => BaseStyles.Main({ margin: '2px 0', ...props })}
`;

const Text = styled(Paragraph)`
    overflow-wrap: break-word;
`;
