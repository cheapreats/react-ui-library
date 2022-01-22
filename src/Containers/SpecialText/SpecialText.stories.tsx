import { action } from '@storybook/addon-actions';
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { SpecialText, SpecialTextProps } from '../index';
import { SmallText } from 'index';
import styled from 'styled-components';

const StyledSmallText = styled(SmallText)`
    &: hover {
        font-weight: bold;
    }
`;

export default {
    title: 'Components/SpecialText',
    component: SpecialText,
    args: {
        text: 'Special Text',
        children: [
            <StyledSmallText onClick={action('Index 0')} children={'pie'}/>,
            <StyledSmallText onClick={action('Index 1')} children={'world'}/>
        ],
    },
} as Meta;

export const Basic: Story<SpecialTextProps> = (args) => (
    <SmallText>Here we introduce <SpecialText {...args}/></SmallText>
);