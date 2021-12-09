import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { Save } from '@styled-icons/fa-solid/Save';
import { ISegmentedButtonProps, SegmentedButton } from '../../index';


export default {
    title: 'Components/SegmentedButton',
    component: SegmentedButton,
    args: {
        width: '400px',
        height: '75px',
    },
} as Meta;

export const Basic: Story<ISegmentedButtonProps> = (args) => {
    const [segments, setSegments] = useState([
        { name: 'button1', active: false, icon: Save },
        { name: 'button2', active: true },
        { name: 'button3', active: false },
        { name: 'button4', active: true },
    ]);
    const onClick = (event: any, index: number) => {
        const newSegments = [...segments];
        newSegments[index].active = !segments[index].active;
        setSegments(newSegments);
    };
    return <SegmentedButton {...args} onClick={onClick} segments={segments} />;
};
