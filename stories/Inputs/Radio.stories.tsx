import React from 'react';
import { Radio, RadioProps } from '../../src';
import { createStoryTitle } from '../Constants';
import { Meta, Story } from '@storybook/react';

export default {
    title: createStoryTitle('Radio'),
    component: Radio,
    args: {
        disabled: false,
        name: 'Demo',
    },
} as Meta;

export const Basic: Story<RadioProps> = (args) => <Radio {...args}></Radio>;

// storiesOf(createStoryTitle('Radio'), module)
//     .addDecorator(withKnobs)
//     .add('with default', () => <Radio name="demo" />)
//     .add('with label', () => (
//         <Radio name="demo" label="Labelled Radio Button" />
//     ))
//     .add('with column', () => (
//         <Radio name="demo" label="Labelled Radio Button" column />
//     ))
//     .add('with disabled', () => (
//         <Radio name="demo" label="Labelled Radio Button" disabled />
//     ))
//     .add('with radioStyle', () => {
//         const radio = () => `
//             border-color: blue;
//         `;

//         return (
//             <Radio
//                 name="demo"
//                 label="Labelled Radio Button"
//                 radioStyle={radio}
//             />
//         );
//     })
//     .add('with activeStyle', () => {
//         const radio = () => `
//             & div {
//                 background-color: blue;
//             }
//         `;
//         const active = () => `
//             border-color: blue;
//             & div {
//                 background-color: blue;
//             }
//         `;

//         return (
//             <Radio
//                 name="demo"
//                 label="Labelled Radio Button"
//                 radioStyle={radio}
//                 activeStyle={active}
//             />
//         );
//     });
