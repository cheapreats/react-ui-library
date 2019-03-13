import React from 'react';
import { storiesOf } from '@storybook/react';
import { Checkbox, Checkboxes } from '../components';

class Test extends React.Component {

    state = {
        test: null
    }

    componentDidMount() {
        window.setTimeout(
            () => this.setState({ test: true }),
            2000
        );
    }

    change = ({ target: { name, value } }) => {
        console.log(name, value, typeof(value));
        this.setState({ [name]: value === 'true' });
    }

    render () {
        return (
            <Checkbox
                label='TEST'
                name='test'
                onChange={this.change}
                value={this.state.test}
            />
        )
    }
}

storiesOf('Checkbox', module)
    .add('with TEST', () => (
        <Test/>
    ))
    .add('with nothing', () => (
        <Checkbox name='a'/>
    ), {
        notes: `The default size is 25`
    })
    .add('with label', () => (
        <Checkbox name='l' label='Ralph?'/>
    ))
    .add('with size increased', () => (
        <Checkbox name='b' size={400} label='Ralph?'/>
    ))
    .add('with size decreased', () => (
        <Checkbox name='c' size={6}/>
    ), { notes: 'Might want to zoom in for this' })
    .add('with value', () => (
        <Checkbox name='d' size={31} onChange={({ target }) => alert(target.checked)} value/>
    ), { notes: '' })
    .add('with disabled', () => (
        <Checkbox name='e' size={31} value disabled/>
    ), { notes: '' })
    .add('with wrapper', () => (
        <Checkboxes>
            <Checkbox name='1' label='Ralph?'/>
            <Checkbox name='2' label='Ralph?'/>
            <Checkbox name='3' label='Ralph?'/>
            <Checkbox name='4' label='Ralph?'/>
            <Checkbox name='5' label='Ralph?'/>
        </Checkboxes>
    ), { notes: '' })
    .add('with wrapper column', () => (
        <Checkboxes column>
            <Checkbox name='1' label='Ralph?'/>
            <Checkbox name='2' label='Ralph?'/>
            <Checkbox name='3' label='Ralph?'/>
            <Checkbox name='4' label='Ralph?'/>
            <Checkbox name='5' label='Ralph?'/>
        </Checkboxes>
    ), { notes: '' })
    .add('with wrapper title', () => (
        <Checkboxes title='What Ralphs do you Ralph?'>
            <Checkbox name='1' label='Ralph?'/>
            <Checkbox name='2' label='Ralph?'/>
            <Checkbox name='3' label='Ralph?'/>
            <Checkbox name='4' label='Ralph?'/>
            <Checkbox name='5' label='Ralph?'/>
        </Checkboxes>
    ), { notes: '' })
    .add('with wrapper description', () => (
        <Checkboxes title='What Ralphs do you Ralph?' description='How do you Ralph?'>
            <Checkbox name='1' label='Ralph?'/>
            <Checkbox name='2' label='Ralph?'/>
            <Checkbox name='3' label='Ralph?'/>
            <Checkbox name='4' label='Ralph?'/>
            <Checkbox name='5' label='Ralph?'/>
        </Checkboxes>
    ), { notes: '' })
    .add('with wrapper margin', () => (
        <Checkboxes margin='100px' title='What Ralphs do you Ralph?' description='How do you Ralph?'>
            <Checkbox name='1' label='Ralph?'/>
            <Checkbox name='2' label='Ralph?'/>
            <Checkbox name='3' label='Ralph?'/>
            <Checkbox name='4' label='Ralph?'/>
            <Checkbox name='5' label='Ralph?'/>
        </Checkboxes>
    ), { notes: '' })
;