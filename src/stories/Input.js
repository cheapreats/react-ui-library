import React from 'react';
import { storiesOf } from '@storybook/react';
import { Input } from '../components/preview';

storiesOf('Input', module)
    .add('with label', () => (
        <Input
            label="What is a Ralph?"
            name="input"
        />
    ), {
        notes: `Input can be used with only one prop 'text'.
        import { Input } from 'cheapreats-react-ui/components/inputs';
        `
    })
    .add('with description', () => (
        <Input
            label="What is a Ralph?"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis mauris ultrices, rutrum lorem sit amet, pellentesque purus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            name="input"
        />
    ), {
        notes: `Input can be used with only one prop 'text'.
        import { Input } from 'cheapreats-react-ui/components/inputs';
        `
    })
    .add('with placeholder', () => (
        <Input
            label="What is a Ralph?"
            placeholder="Fill in a Ralph"
            name="input"
        />
    ), {
        notes: `Input can be used with only one prop 'text'.
        import { Input } from 'cheapreats-react-ui/components/inputs';
        `
    })
    .add('with error', () => (
        <Input
            label="What is a Ralph?"
            placeholder="Fill in a Ralph"
            error="No Ralph for you"
            name="input"
        />
    ), {
        notes: `Input can be used with only one prop 'text'.
        import { Input } from 'cheapreats-react-ui/components/inputs';
        `
    })
    .add('with valid', () => (
        <Input
            label="What is a Ralph?"
            placeholder="Fill in a Ralph"
            valid
            name="input"
        />
    ), {
        notes: `Input can be used with only one prop 'text'.
        import { Input } from 'cheapreats-react-ui/components/inputs';
        `
    })
    .add('with disabled', () => (
        <Input
            label="What is a Ralph?"
            placeholder="Fill in a Ralph"
            disabled
            name="input"
        />
    ), {
        notes: `Input can be used with only one prop 'text'.
        import { Input } from 'cheapreats-react-ui/components/inputs';
        `
    })
;
