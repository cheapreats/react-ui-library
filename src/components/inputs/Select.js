import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CaretDown } from 'styled-icons/fa-solid/CaretDown';
import styled from 'styled-components';
import { PRIMARY_FONT } from '../variables';

const Container = styled.div`
    font-family: ${ PRIMARY_FONT };
    position: relative;
    font-size: 0.9rem;
    font-weight: bold;
`;

const Caret = styled(CaretDown)`
    height: 15px;
    width: 15px;
    padding: 4px;
    border-radius: 999px;
    margin: -8px -12px -8px 8px;
    opacity: 0.7;
    transition:
        opacity 300ms ease-in-out,
        background-color 300ms ease-in-out,
        transform 300ms ease-in-out
    ;
    &:hover {
        background-color: rgba(0,0,0,0.05);
    }

    ${
        ({ show }) => show? `transform: rotate(180deg) translate3d(0,0,0);`: ''
    }
`;

const Selected = styled.div`
    padding: 0px 20px;
    border-radius: 10px;
    background-color: #f3f3f3;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background-color 300ms ease-in-out;

    &:hover {
        background-color: #efefef;
    }

    &:hover p, &:hover svg {
        opacity: 1;
    }
`;

const Text = styled.p`
    flex-grow: 1;
    opacity: 0.7;
    margin: 9px 0;
    transition: opacity 300ms ease-in-out;
    overflow: hidden;
`;

const Options = styled.ul`
    overflow: auto;
    width: 100%;
    height: 100%;
    margin: 0;
    list-style-type: none;
    padding: 0;

    &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        background-color: rgba(0,0,0,0.1);

        &-thumb {
            background-color: rgba(0,0,0,0.25);
            border-radius: 99px;
        }
    }
`;

const Label = styled.label`
    padding-bottom: 10px;
    display: block;
`;

const OptionsWrapper = styled.div`
    position: absolute;
    box-shadow: 0 0 2px 2px rgba(0,0,0,0.1);
    background-color: white;
    margin-top: -10px;
    top: auto;
    bottom: auto;
    right: 0;
    left: 0;
    z-index: -1;
    overflow: hidden;
    box-sizing: border-box;
    border-radius: 10px;
    transition:
        height 300ms ease-in-out,
        opacity 300ms ease-in-out
    ;

    ${ ({ show }) => show? `
        height: 200px;
        opacity: 1;
    ` : `
        height: 0;
        opacity: 0;
    `
    }
    width: 100%;
`;

const Option = styled.li`
    height: 50px;
    box-sizing: border-box;
    padding: 15px 20px;
    display: flex;
    cursor: pointer;
    align-items: center;
    transition: background-color 300ms ease-in-out;

    ${ ({ active }) => active? 'background-color: rgba(0,0,0,0.04);': '' }
    &:hover {
        background-color: rgba(0,0,0,0.04);
    }
`;

export class Select extends Component {

    ref = React.createRef();
    state = {
        value: this.props.value,
        show: false
    }

    componentDidMount() {
        const { name, value } = this.props;
        this.ref.name = name;
        if (value !== null && value !== undefined) {
            this.ref.value = value;
        }
    }

    select = ({ target }) => {
        const value = target.getAttribute('data-value');
        this.setState({ value: parseInt(value), show: false });
        this.ref.value = value;

        if (this.props.onChange) this.props.onChange({ target: this.ref });
    }

    toggleOptions = () => this.setState(({ show }) => ({ show: !show }))

    render() {
        const { value, show } = this.state;
        const { options, placeholder, label, className } = this.props;
        return (
            <Container className={className} ref={ el => this.ref = el }>
                { label? <Label>{ label }</Label>: null }
                <Selected onClick={this.toggleOptions}>
                    <Text>{ value !== null && value !== undefined ? options[value] : placeholder }</Text>
                    <Caret show={show}/>
                </Selected>
                <OptionsWrapper show={show}>
                    <Options>
                        {
                            options? options.map((option, i) =>
                                <Option key={i} onClick={this.select} data-value={ i } active={ i === value }>
                                    { option }
                                </Option>
                            ): null
                        }
                    </Options>
                </OptionsWrapper>
            </Container>
        );
    }
}

Select.propTypes = {
    options: PropTypes.array,
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.number,
    label: PropTypes.string,
    onChange: PropTypes.func
};