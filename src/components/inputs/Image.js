import React, { useState, useEffect, useCallback, useRef } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop from 'react-image-crop';
import styled from 'styled-components';

import InputLayout from '../_helpers/InputLayout';
import { transition, position, flex } from '../mixins';
import { Heading } from '../texts/Heading';
import { Buttons } from '../containers/Buttons';
import { Button } from '../buttons/Button';
import { Modal } from '../preview';

const Drop = styled.input`
    ${ position('absolute', 'auto', 0) }
    opacity: 0;
    cursor: pointer;
    height: 100%;
    width: 100%;
`;

const Container = styled.div`
    display: inline;
    font-weight: bold;
    padding: 10px 20px;
    position: relative;
    overflow: hidden;
    background-color: ${ ({ theme }) => theme.colors.primary };
    color: white;
    font-size: 0.9rem;
    border-radius: 999px;
    margin-right: auto;
    margin-top: 10px;
    box-shadow: ${ ({ theme }) => theme.shadows[0] };
    ${ transition(['background-color']) }
    &:hover, &:focus {
        background-color: #B22330;
    }
    &:active {
        background-color: #6C121A;
    }
`;

const CropWrapper = styled.div`
    ${ flex('row', 'center') }
    background-color: ${ ({ theme }) => theme.colors.inputBackground.default };
    padding: 20px;
`;

export const Image = ({
    accept = 'image/*',
    aspect = 1,
    onChange = () => {},
    maxWidth,
    ...props
}) => {
    const [ crop, setCrop ] = useState({ aspect: 2/1 });
    const [ loading, setLoading ] = useState(false);
    const [ image, setImage ] = useState();
    const modal = useState(false);
    const img = useRef();

    useEffect(() => () => { URL.revokeObjectURL(image) }, []);

    const upload = useCallback(async ({ target }) => {
        URL.revokeObjectURL(image);
        const [ file ] = target.files;
        if (file && file.type.match(accept)) {
            setImage(URL.createObjectURL(file));
            modal[1](true);
        }
    }, []);

    const onClose = useCallback(() => {
        URL.revokeObjectURL(image);
        setCrop({ aspect });
        img.current = null;
        setImage(null);
    }, []);

    const onCrop = useCallback(async (e, i) => {
        setCrop(e);
        img.current = i;
    }, []);

    const onSubmit = useCallback(() => (
        new Promise(resolve => {
            setLoading(true);
            const canvas = document.createElement('canvas');
            canvas.width = maxWidth;
            canvas.height = 1/aspect * maxWidth;
            const ctx = canvas.getContext('2d');

            const draw = new window.Image();
            draw.onload = () => {
                const { x, y, width, height } = img.current;
                ctx.drawImage(
                    draw,
                    x, y, width, height,
                    0, 0, canvas.width, canvas.height
                );
                const base = canvas.toDataURL('image/jpeg');
                setLoading(false);
                modal[1](false);
                resolve(base);
            };
            draw.src = image;
        })
    ), [ img.current ]);

    return (
        <InputLayout { ...props }>
            <Container>
                Upload Image
                <Drop type='file' accept={ accept } onChange={ upload }/>
            </Container>
            <Modal padding='0' base state={ modal } onClose={ onClose }>
                <Heading type='h2' bold margin='15px 25px'>Crop Image</Heading>
                <CropWrapper>
                    <ReactCrop
                        src={ image }
                        crop={ crop }
                        onChange={ onCrop }
                    />
                </CropWrapper>
                <Buttons margin='15px 25px' spacing='0'>
                    <Button disabled={!crop.x} onClick={ onSubmit } primary>Done</Button>
                </Buttons>
            </Modal>
        </InputLayout>
    );
};