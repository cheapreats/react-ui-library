import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import InputLayout from '../_helpers/InputLayout';
import { transition, position, flex } from '../mixins';
import { Modal } from '../preview';
import ReactCrop from 'react-image-crop';
import { Heading } from '../texts/Heading';
import 'react-image-crop/dist/ReactCrop.css';

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
`;

export const Image = ({ accept = 'image/*', ...props }) => {
    const [ crop, setCrop ] = useState({ aspect: 2/1 });
    const [ image, setImage ] = useState();
    const modal = useState(false);

    useEffect(() => () => { console.log('reee'); URL.revokeObjectURL(image) }, []);
    const upload = useCallback(async ({ target }) => {
        URL.revokeObjectURL(image);
        const [ file ] = target.files;
        if (file && file.type.match(accept)) {
            setImage(URL.createObjectURL(file));
            modal[1](true);
        }
    }, []);

    return (
        <InputLayout { ...props }>
            <Container>
                Upload Image
                <Drop type='file' accept={ accept } onChange={upload}/>
            </Container>
            <Modal padding='0' base state={ modal }>
                <Heading type='h2' bold margin='15px 25px'>Upload Image</Heading>
                <CropWrapper>
                    <ReactCrop src={ image } crop={ crop } minWidth='50' onChange={e => setCrop(e)}/>
                </CropWrapper>
            </Modal>
        </InputLayout>
    );
};