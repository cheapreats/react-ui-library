import React from 'react';
import { storiesOf } from '@storybook/react';
import {Input} from '../components/inputs';

storiesOf('Input', module)
    .add('with title', () => (
        <Input 
            title="Form Title"
        />
    ), {
        notes: `Input can be used with only one prop 'text'.
        import { Input } from 'cheapreats-react-ui/components/inputs';
        `
    })
    .add('with information', () => (
        <Input
            information="Show me the input requirements"
        />
    ), {
        notes: ""
    })
    .add('with error', () => (
        <Input
            error="A mistake was made"
        />
    ), {
        notes: "Show me any input errors that occur"
    })
    .add('with placeholder', () => (
        <Input
            placeholder="Place your text here"
        />
    ), {
        notes: "Useful for in-place examples"
    })
    .add('As a checkbox', () => (
        <Input
            type="checkbox"
            information="I'm a checkbox"
        />
    ), {
        notes: "Checkbox Input Field"
    });