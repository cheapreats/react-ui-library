import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Check } from 'styled-icons/fa-solid/Check';
import styled from 'styled-components';
import { position, scroll, flex, transition } from '../mixins';
import { PRIMARY_FONT, PRIMARY_COLOUR, SHADOW_RAISE_1 } from '../variables';

const FormTitle = styled.label`
    margin-top: 10px;
`;

const InformationMessage = styled.p`
    margin: 2px 0 0;
    font-size: 0.8rem;
    color: rgba(0,0,0,0.5);
`;

const Container = styled.div`
    font-family: ${ PRIMARY_FONT };
    position: relative;
    padding: 10px 0;
    font-weight: bold;
    font-size: 0.9rem;
    ${ flex('column') }
`;

const Icon = styled(Check)`
    width: 12px;
    height: 12px;
    padding: 0 8px;
    cursor: pointer;
    margin: 0 -10px 0 auto;
    opacity: 0;
    pointer-events: none;
    ${ ({ show }) => show ? `
        opacity: 1;
        pointer-events: all;
    `: '' }
`;

const Display = styled.p`
    box-sizing: border-box;
    background-color: rgba(0,0,0,0.05);
    border-radius: 10px;
    padding: 10px 20px;
    margin: 5px 0;
    max-width: 100%;
    z-index: 2;
    transition: opacity ease-in-out 300ms;

    ${ flex('row', 'flex-start', 'center') }
    ${ transition(['max-width', 'border-radius', 'box-shadow', 'color', 'background-color'], 500) }
    ${ ({ show }) => show ? `
        max-width: 300px;
        color: white;
        border-radius: 10px 10px 0 0;
        box-shadow: ${ SHADOW_RAISE_1 };
        background-color: ${ PRIMARY_COLOUR };
    ` : '' }
`;

const Col = styled.ul`
    flex-grow: 1;
    list-style-type: none;
    padding: 0;
    margin: 0;
    overflow: auto;
    ${ scroll }
`;

const Item = styled.li.attrs(props => ({
    'data-index': props['data-index'],
    'data-name': props['data-name']
}))`
    padding: 10px 5px 10px 15px;
    ${ transition(['background-color']) }
    ${ ({ blank }) => blank ? `
        height: 38px;
        padding: 0;
    ` : `
        cursor: pointer;
        &:hover {
            background-color: rgba(0,0,0,0.04);
        }
    ` }
    ${ ({ active }) => active ? `
        &, &:hover {
            background-color: rgba(0,0,0,0.07);
        }
    ` : '' }
`;

const Picker = styled.div`
    ${ position('absolute', '-15px 0 0', '100%', 0, 'auto', 0) }
    height: 152px;
    width: 300px;
    opacity: 0;
    pointer-events: none;
    background-color: white;
    z-index: 1;
    overflow: hidden;
    border-radius: 0 0 10px 10px;
    transform: translate3d(0, -50px, 0);
    box-shadow: ${ SHADOW_RAISE_1 };
    ${ flex() }
    ${ transition(['opacity', 'transform'], 500) }
    ${ ({ show }) => show ? `
        transform: translate3d(0, 0, 0);
        pointer-events: all;
        opacity: 1;
    ` : '' }
`;

const Error = styled.p`
    font-weight: bold;
    padding-left: 5px;
    font-size: 0.8rem;
    margin: 0 0 5px;
    color: ${PRIMARY_COLOUR};
`;

const twelve = new Array(12).fill(1);
const sixty = new Array(60).fill(1);
const periods = ['AM', 'PM'];

export class TimePicker extends Component {

    hour = React.createRef()
    min = React.createRef()
    period = React.createRef()

    constructor(props) {
        super(props);
        const date = this.props.value || new Date();
        const hour = date.getHours();
        const min = date.getMinutes();
        this.state = {
            show: false,
            date,
            hour: (hour - 1) % 12,
            min,
            period: hour < 12 ? 0 : 1,
        }
    }

    componentDidUpdate({ value }) {
        if (value !== this.props.value) {
            this.setState({ date: this.props.value });
        }
    }

    reset = () => {
        const { date } = this.state;
        const hour = date.getHours();
        const min = date.getMinutes();
        this.setState({
            hour: (hour - 1) % 12,
            min,
            period: hour < 12 ? 0 : 1,
        });
    }

    setDate = () => {
        const { date } = this.state;
        const { name, onChange } = this.props;

        if (onChange) {
            const target = { name, value: date };
            onChange({ target });
        }

        this.setState({
            date: this.props.value || new Date()
        }, this.reset);
    }

    scroll = (smooth = true) => {
        const { hour, min, period } = this.state;
        const options = smooth ? { behavior: 'smooth' } : {};

        this.hour.scrollTo({ top: 38 * hour, ...options });
        this.min.scrollTo({ top: 38 * min, ...options });
        this.period.scrollTo({ top: 38 * period, ...options });
    }

    toggle = () => {
        this.setState(
            ({ show }) => ({ show: !show }),
            () => !this.state.show ? this.setDate() : null
        );
        this.scroll();
    }

    handle = ({ target }) => {
        const name = target.getAttribute('data-name');
        const index = target.getAttribute('data-index');
        this.setState({ [name]: parseInt(index) }, () => {
            this.scroll();
            this.onChange();
        });
    }

    onChange = () => {
        const { hour, min, period, date } = this.state;
        date.setHours(hour + 1 + ((hour !== 11 ? period : (period + 1) % 2 ) * 12));
        date.setMinutes(min);
        this.setState({ date });
    }

    render() {
        const { className, title, description, value, error } = this.props;
        const { date, show, hour, min, period } = this.state;
        return (
            <Container className={ className }>
                <FormTitle>{ title }</FormTitle>
                { description ? <InformationMessage>{ description }</InformationMessage> : null }
                <Display show={ show } onClick={ this.toggle }>
                    { moment(show ? date : value).format('h:mm A') }
                    <Icon show={ show }/>
                </Display>
                <Error>{ error && !show ? error : '' }</Error>
                <Picker show={ show }>
                    <Col ref={el => this.hour = el}>
                        {
                            twelve.map((i, key) => (
                                <Item
                                    data-index={ key }
                                    data-name='hour'
                                    active={ key === hour }
                                    onClick={ this.handle }
                                    key={ key }
                                >
                                    { key + 1 }
                                </Item>
                            ))
                        }
                    </Col>
                    <Col ref={el => this.min = el}>
                        {
                            sixty.map((i, key) => (
                                <Item
                                    data-index={ key }
                                    data-name='min'
                                    active={ key === min }
                                    onClick={ this.handle }
                                    key={ key }
                                >
                                    { key }
                                </Item>
                            ))
                        }
                    </Col>
                    <Col ref={el => this.period = el}>
                        {
                            periods.map((i, key) => (
                                <Item
                                    data-index={ key }
                                    data-name='period'
                                    active={ key === period }
                                    onClick={ this.handle }
                                    key={ i }
                                >
                                    { i }
                                </Item>
                            ))
                        }
                    </Col>
                </Picker>
            </Container>
        );
    }
}

TimePicker.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    error: PropTypes.string,
    /** A JavaScript Date object, defaults to today */
    value: PropTypes.object,
    /** Takes 2 parameters, the new date and identifier (name) of input */
    onChange: PropTypes.func
}