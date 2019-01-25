import React from 'react';
import { storiesOf } from '@storybook/react';
import {Input} from '../components/inputs/Input';

storiesOf('Input', module)
    .add('with required', () => (
        <Input
            title="Form Title"
            name="input"

        />
    ), {
        notes: `Input can be used with only one prop 'text'.
        import { Input } from 'cheapreats-react-ui/components/inputs';
        `
    })
    .add('with information', () => (
        <Input
            title="Form Title"
            information="Show me the input requirements"
            name="input1"
        />
    ), {notes: `Information Field Very Useful`})
    .add('with error', () => (
        <Input
            title="Form Title"
            error="A mistake was made"
            name="input2"
        />
    ), {
        notes: "Show me any input errors that occur"
    })
    .add('with valid', () => (
        <Input
            title="Form Title"
            name="input5"
            valid
        />
    ), {
        notes: "Show me any input valid that occur"
    })
    .add('with placeholder', () => (
        <Input
            title="Form Title"
            placeholder="Place your text here"
            name="input3"
        />
    ), {
        notes: "Useful for in-place examples"
    })
;