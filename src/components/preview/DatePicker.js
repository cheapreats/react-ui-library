import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import { CalendarAlt } from 'styled-icons/fa-regular/CalendarAlt';
import { AngleLeft, AngleRight } from 'styled-icons/fa-solid';

import InputLayout, { InputLayoutProps, InputStyles } from '../_helpers/InputLayout';
import { ExtractProps } from '../_helpers/Util';
import { flex, position, transition } from '../mixins';
import { SHADOW_RAISE_1 } from '../variables';

const Container = styled.div`
    max-width: ${ ({ expanded }) => expanded ? 320 : 550 }px;
    ${ transition('max-width') }
    position: relative;
`;

const Icon = styled.svg`
    width: 15px;
    height: 15px;
    margin: ${ ({ margin = 0 }) => margin };
    ${ ({ clickable }) => clickable ? `
        ${ transition(['color', 'background-color']) }
        cursor: pointer;
        border-radius: 50%;
        padding: 5px;
        &:hover, &:active {
            color: black;
            background-color: rgba(0,0,0,0.08);
        }
    ` : '' }

`;

const Display = {
    Container: styled.p`
        background-color: ${ ({ theme }) => theme.colors.inputBackground.default };
        ${ flex('flex-start', 'center') }
        ${ InputStyles }
        cursor: pointer;
    `,
    Text: styled.span`
        overflow: hidden;
        padding-right: 16px;
        white-space: nowrap;
        text-overflow: ellipsis;
    `
};

const Picker = {
    Container: styled.div`
        color: #545454;
        height: auto;
        font-weight: bold;
        padding-bottom: 8px;
        background-color: white;
        border-radius: 8px;
        max-width: 320px;
        box-shadow: ${ SHADOW_RAISE_1 };
        ${ transition(['opacity', 'transform']) }
        ${ position('absolute', '5px 0 0', 0, 0, 'auto', 0) }
        ${ ({ expanded }) => `
            opacity: ${ expanded ? 1 : 0 };
            pointer-events: ${ expanded ? 'all' : 'none' };
            transform: translate3d(0, ${ expanded ? 0: -40 }px, 0);
        ` }
    `,
    Head: styled.div`
        ${ flex('center') }
        padding: 12px;
    `,
    Head__Text: styled.span`
        flex-grow: 1;
        margin: 0 10px;
        font-weight: bold;
        font-size: 0.85rem;
        text-align: center;
    `,
    Row: styled.div`
        ${ flex('space-evenly', 'center') }
        width: 100%;
        ${ ({ head }) => head ? `
            ${ Picker.Column } {
                font-size: 0.85rem;
                padding-bottom: 5px;
                pointer-events: none;
            }
        `: '' }
    `,
    Column: styled.span`
        flex-grow: 1;
        flex-basis: 0;
        text-align: center;
        height: 30px;
        max-width: 30px;
        cursor: pointer;
        border-radius: 50%;
        ${ flex('center') }
        ${ transition(['background-color', 'color']) }
        ${ ({ hide, active, theme }) => (
            hide ? `
                opacity: 0.2;
                pointer-events: none;
            ` : active ? `
                background-color: ${ theme.colors.primary };
                color: white;
            ` : `
                &:hover {
                    background-color: ${ theme.colors.inputBackground.default };
                }
            `
        )}
    `
};

const week = Array(7).fill();
const setMonth = (date, amount) => date.add(amount, 'month');
const capture = e => e.stopPropagation();
const _expand = async (set, handler) => {
    set(true);
    window.setTimeout(() => {
        window.addEventListener('click', handler, { once: true });
    }, 200);
};
const createCalendar = (date, now, active, setDate) => {
    const res = [];
    date = moment(date);
    let i = 0;
    while (parseInt(date.format('YYMM')) <= parseInt(now.format('YYMM'))) {
        res.push(<Picker.Row key={i}>
            {
                week.map((v, k) => {
                    const d = moment(date);
                    date.add(1, 'day');
                    return (
                        <Picker.Column
                            key={ k }
                            onClick={() => setDate(d)}
                            active={ d.format('l') === active.format('l') }
                            hide={ d.month() !== now.month() }
                        >
                            { d.date() }
                        </Picker.Column>
                    );
                })
            }
        </Picker.Row>);
        i++;
    }
    return res;
}

export const DatePicker = props => {
    const [ layoutProps ] = ExtractProps(InputLayout.propTypes, props);
    const { disabled, value = new Date() } = props;

    const [ expanded, setExpanded ] = useState(false);
    const [ date, _setDate ] = useState(moment(value));
    const [ calendar, setCalendar ] = useState(null);
    const listener = useRef(() => setExpanded(false));
    const expand = () => {
        if (!disabled) {
            _expand(setExpanded, listener.current);
            setDate(date);
        }
    };
    const setDate = next => {
        _setDate(next);
        setCalendar(createCalendar(
            moment(date).startOf('month').startOf('isoWeek'),
            next, moment(value),
            d => {
                window.removeEventListener('click', listener.current, { once: true });
                setExpanded(false);
                props.onChange(new Date(d));
            }
        ));
    }

    return (
        <InputLayout { ...layoutProps }>
            <Container expanded={ expanded }>
                <Display.Container onClick={ expand }>
                    <Display.Text>{ moment(value).format('LL') }</Display.Text>
                    <Icon as={ CalendarAlt } margin='0 0 0 auto'/>
                </Display.Container>
                <Picker.Container expanded={ expanded } onClick={ capture }>
                    <Picker.Head>
                        <Icon as={ AngleLeft } onClick={ () => setDate(setMonth(date, -1)) } clickable/>
                        <Picker.Head__Text>{ date.format('MMMM YYYY') }</Picker.Head__Text>
                        <Icon as={ AngleRight } onClick={ () => setDate(setMonth(date, 1)) } clickable/>
                    </Picker.Head>
                    <Picker.Row head>
                        <Picker.Column>Mon</Picker.Column>
                        <Picker.Column>Tue</Picker.Column>
                        <Picker.Column>Wed</Picker.Column>
                        <Picker.Column>Thu</Picker.Column>
                        <Picker.Column>Fri</Picker.Column>
                        <Picker.Column>Sat</Picker.Column>
                        <Picker.Column>Sun</Picker.Column>
                    </Picker.Row>
                    { calendar }
                </Picker.Container>
            </Container>
        </InputLayout>
    );
};

DatePicker.propTypes = {
    ...InputLayoutProps,
    /** A JavaScript Date object, defaults to today */
    value: PropTypes.object,
    /** Takes 2 parameters, the new date and identifier (name) of input */
    onChange: PropTypes.func
}