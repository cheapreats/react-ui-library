import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { flex, transition } from '../mixins';
import styled from 'styled-components';

const Container = styled.ul`
    list-style-type: none;
    ${ ({ row }) => row ? `
        ${ flex() }
    ` : '' }
    padding: 0;
`;

const Item = styled.li.attrs(props => ({ 'data-index': props['data-index'] }))`
    cursor: pointer;
    &:not(:hover) * { pointer-events: none; }
    ${ ({ spacing, row }) => `margin-${ row ? 'right' : 'bottom' }: ${ spacing }px;` }
    ${ ({ animate }) => animate ? transition(['opacity', 'transform']) : null }
    ${
        ({ spacing, shift, row }) => shift ? (
            row ? `
                transform: translate3d(${ shift > 0 ? (shift - spacing) : (shift + spacing) }px, 0, 0);
            ` : `
                transform: translate3d(0, ${ shift }px, 0);
            `
        ) : ''
    }
    ${ ({ active }) => active ? `opacity: 0` : '' }
`;

const SPACING = 10;
export class Draggable extends Component {

    ref = React.createRef()
    state = {
        active: null,
        over: null,
        height: null,
        animate: false,
    }

    componentDidMount() {
        this.ref.addEventListener('dragend', this.end);
    }

    componentWillUnmount() {
        this.ref.removeEventListener('dragend', this.end);
    }

    start = e => {
        const index = e.target.getAttribute('data-index');
        const height = e.target.offsetHeight;
        const i = parseInt(index);
        this.setState({ active: i, over: i, height, animate: true });
    }

    move = e => {
        const index = e.target.getAttribute('data-index');
        const i = parseInt(index);

        if (this.state.over !== i) {
            this.setState({ over: i });
        }
    }

    end = () => {
        const { over, active } = this.state;
        const { onChange, items = [] } = this.props;
        const res = items.copyWithin();

        if (over !== active && items.length > 0) {
            res.splice(over, 0, res.splice(active, 1)[0]);
        }

        this.setState({ active: null, over: null, height: null, animate: false });
        if (onChange) onChange(res, over);
    }

    getKey = (item, key, def) => {
        if (!key) return def;
        switch(typeof(key)) {
            case 'string':
                return item[key];
            case 'object':
                return key.reduce((acc, curr) => acc[curr], item);
            default:
                return def;
        }
    }

    shift = i => {
        const { spacing = SPACING } = this.props;
        const { over, height, active } = this.state;
        if (active === i) return 0;
        const diff = over - active;
        // Above/Left of active
        if (i <= diff + active && i > active) {
            return -(height + spacing);
        }

        else if (i >= diff + active && i < active) {
            return height + spacing;
        }

    }

    render() {
        const { active, animate } = this.state;
        const { className, map, asKey, items = [], spacing = SPACING, row } = this.props;
        return (
            <Container className={ className } ref={el => this.ref = el} row={ row }>
                {
                    map ? items.map((item, i) => {
                        const isActive = active === i;
                        const key = this.getKey(item, asKey, i);
                        return (
                            <Item
                                key={ key }
                                data-index={ key }
                                active={ isActive }
                                shift={ this.shift(i) }
                                onDragStart={ this.start }
                                onDragOver={ this.move }
                                animate={ animate }
                                spacing={ spacing }
                                row={ row }
                                draggable
                            >
                                { map(item, isActive, key) }
                            </Item>
                        );
                    }) : null
                }
            </Container>
        );
    }
}

Draggable.propTypes = {
    className: PropTypes.string,
    /** Parameters => (item, whether or not active item, key of item) */
    map: PropTypes.func,
    onChange: PropTypes.func,
    /** Can be a string or array, array for deeply nested attributes */
    asKey: PropTypes.any,
    items: PropTypes.array,
    spacing: PropTypes.number,
    row: PropTypes.bool

}
