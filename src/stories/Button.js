import React from 'react';
import { Plus } from 'styled-icons/fa-solid/Plus';
import { storiesOf } from '@storybook/react';
import { Global } from '../components/preview';
import { Button, Buttons } from '../components';

storiesOf('Button', module)
    .add('with text and primary', () => (
        <Button primary text={"Confirm Primary"}/>
    ), {
        notes: `Button can be used with only one prop 'text'. However this button won't do anything.
        import { Button } from 'cheapreats-react-ui/components/buttons';
        `
    })
    .add('with icon', () => (
        <Button primary icon={ Plus } text={"Add Ralphs"}/>
    ), {notes: `Information Field Very Useful`})
    .add('with size', () => (
        <Button primary icon={ Plus } size={60} text={"Add Ralphs"}/>
    ), {
        notes: `Button can be resized to be bigger or smaller for different situations (size in px). The default is 0.9rem font size with a padding of 10px 20px';
        `
    })
    .add('with no primary', () => (
        <Button text={"Confirm"}/>
    ), {notes: `Information Field Very Useful`})
    .add('with onClick action', () => (
        <Button
            text={"Show me an alert!"}
            onClick={e => {
                window.alert("You just clicked on the button!");
            }}
        />
    ), {
        notes: "You can also pass in an onClick prop to specify the action to take upon clicking."
    })
    .add('with primary and disable', () => (
        <Button
            text={"Disabled"}
            primary
            disabled
        />
    ), {
        notes: "You can also pass in an onClick prop to specify the action to take upon clicking."
    })
    .add('with disabled', () => (
        <Button
            text={"I am disabled... :("}
            onClick={e => {
                window.alert("You just clicked on the button!");
            }}
            disabled
        />
    ), {
        notes: "Disabling the button will also disable all onClick events."
    })
    .add('with flat', () => (
        <Button
            flat
            text='Ralph might have been here...'
        />
    ), {
        notes: "Removes the box shadow from the button"
    })
    .add('with black', () => (
        <Button
            black
            text='Ralph might have been here...'
        />
    ), {
        notes: "Never go back"
    })
    .add('with container', () => (
        <Buttons>
            <Button black text='Ralph might have been here...'/>
            <Button black text='Ralph might have been here...'/>
            <Button black text='Ralph might have been here...'/>
            <Button black text='Ralph might have been here...'/>
            <Button black text='Ralph might have been here...'/>
        </Buttons>
    ), {
        notes: "Use <Buttons> to encapsulate the buttons into a row"
    })
    .add('with container column', () => (
        <Buttons column>
            <Button black text='Ralph might have been here...'/>
            <Button black text='Ralph might have been here...'/>
            <Button black text='Ralph might have been here...'/>
            <Button black text='Ralph might have been here...'/>
            <Button black text='Ralph might have been here...'/>
        </Buttons>
    ), {
        notes: "Default is row with wrapping"
    })
    .add('with custom spacing', () => (
        <Buttons column spacing={ 40 }>
            <Button black text='Ralph might have been here...'/>
            <Button black text='Ralph might have been here...'/>
            <Button black text='Ralph might have been here...'/>
            <Button black text='Ralph might have been here...'/>
            <Button black text='Ralph might have been here...'/>
        </Buttons>
    ), {
        notes: "Default is 10px"
    })
;
