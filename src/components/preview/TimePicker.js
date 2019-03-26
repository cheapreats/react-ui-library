import React from 'react';
import styled from 'styled-components';
import { Clock } from 'styled-icons/fa-regular/Clock';
import { INPUT_BACKGROUND, INPUT_BACKGROUND_INVALID, INPUT_BACKGROUND_VALID } from '../variables';
import InputLayout, { InputStyles } from '../_helpers/InputLayout';
import { ExtractProps } from '../_helpers/Util';
import { flex, position } from '../mixins';

const Container = styled.div`
    width: ${ ({ width }) => width + (typeof(width) === 'string' ? '' : 'px') };
    ${ ({ disabled }) => disabled && `& * { cursor: not-allowed !important; }` }
    font-size: 0.825rem;
    position: relative;
    font-weight: bold;
`;

const DisplayTime = styled.p`
    ${ InputStyles }
    ${ flex('row', 'flex-start', 'center') }
    background-color: ${ ({ valid, error }) => (
        error ? INPUT_BACKGROUND_INVALID :
        valid ? INPUT_BACKGROUND_VALID :
        INPUT_BACKGROUND
    )};
    cursor: pointer;
    width: 100%;
`;

const Icon = styled(Clock)`
    margin-left: auto;
    width: 14px;
    height: 14px;
`;

const Picker = styled.div`

`;

export const TimePicker = params => {
    const [ layoutProps, props ] = ExtractProps(
        InputLayout.propTypes, params, {}, ['error', 'disabled', 'name']
    );

    return (
        <InputLayout { ...layoutProps }>
            <Container>
                <DisplayTime>4:00 PM<Icon/></DisplayTime>
                <Picker>

                </Picker>
            </Container>
        </InputLayout>
    );
};