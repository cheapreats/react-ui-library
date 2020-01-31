import React, { useState, useEffect, useCallback, useRef } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop from 'react-image-crop';
import styled from 'styled-components';

import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import { ImplicitPropsInterface } from '@Utils/Hooks';
import { transition, position, flex } from '../Utils/Mixins';
import { Heading } from '../Text/Heading';
import { Button } from './Button';
import { Modal } from '../Containers/Modal';

export interface ImageProps
    extends MainInterface,
        ResponsiveInterface,
        ImplicitPropsInterface {
    maxWidth?: number | undefined;
    accept?: string;
    aspect?: number;
    width?: number;
    onImageReturn?: Function;
}

export const Image: React.FC<ImageProps> = ({
    accept = 'image/*',
    aspect = 1,
    maxWidth = 1000,
    onImageReturn = () => {},
    ...props
}): React.ReactElement => {
    const [crop, setCrop] = useState({ aspect });
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState();
    const modal = useState(false);
    const img = useRef({ x: '', y: '', width: '', height: '' });

    useEffect(
        () => () => {
            URL.revokeObjectURL(image);
        },
        [],
    );

    const upload = useCallback(async ({ target }) => {
        URL.revokeObjectURL(image);
        const [file] = target.files;
        if (file && file.type.match(accept)) {
            const modifiedImg = new window.Image();
            modifiedImg.src = URL.createObjectURL(file);
            modifiedImg.onload = () => {
                const elem = document.createElement('canvas');

                const imageHeight =
                    document.documentElement.clientHeight * 0.675 * 0.71;
                const imageWidth =
                    imageHeight / (modifiedImg.height / modifiedImg.width);

                elem.width = imageWidth;
                elem.height = imageHeight;

                const ctx: any = elem.getContext('2d');
                // img.width and img.height will contain the original dimensions
                ctx.drawImage(modifiedImg, 0, 0, imageWidth, imageHeight);

                ctx.canvas.toBlob((blob: BlobPart) => {
                    setImage(URL.createObjectURL(blob));
                });
            };
            modal[1](true);
        }
    }, []);

    const onClose = useCallback(() => {
        URL.revokeObjectURL(image);
        setCrop({ aspect });
        img.current = { x: '', y: '', width: '', height: '' };
        setImage(undefined);
    }, []);

    const onCrop = useCallback(async (e, i) => {
        setCrop(e);
        img.current = i;
    }, []);

    const onSubmit = useCallback(
        () =>
            new Promise(resolve => {
                setLoading(true);
                const canvas: any = document.createElement('canvas');
                canvas.width = maxWidth;
                canvas.height = (1 / aspect) * maxWidth;
                const ctx = canvas.getContext('2d');

                const draw = new window.Image();
                draw.onload = () => {
                    const { x, y, width, height } = img.current;
                    ctx.drawImage(
                        draw,
                        x,
                        y,
                        width,
                        height,
                        0,
                        0,
                        canvas.width,
                        canvas.height,
                    );
                    const base = canvas.toDataURL('image/jpeg');
                    setLoading(false);
                    modal[1](false);
                    resolve(base);
                    onImageReturn(base);
                };
                draw.src = image;
            }),
        [img.current],
    );
    return (
        <div>
            <Container>
                Upload Image
                <Drop type="file" accept={accept} onChange={upload} />
            </Container>
            <Modal padding="0" state={modal} onClose={onClose}>
                <Heading type="h2" bold margin="15px 25px">
                    Crop Image
                </Heading>

                <CropWrapper>
                    <ReactCrop src={image} crop={crop} onChange={onCrop} />
                </CropWrapper>

                <ButtonDiv>
                    <Button
                        loading={loading}
                        disabled={!crop.aspect}
                        onClick={onSubmit}
                        primary
                    >
                        Done
                    </Button>
                </ButtonDiv>
            </Modal>
        </div>
    );
};
export default Image;

const Drop = styled.input`
    ${position('absolute', 'auto', 0)}
    opacity: 0;
    cursor: pointer;
    height: 100%;
    width: 100%;
`;

const Container = styled.div<ImageProps>`
    display: inline;
    font-weight: bold;
    padding: 10px 20px;
    position: relative;
    overflow: hidden;
    background-color: ${({ theme }): string => theme.colors.primary};
    color: white;
    font-size: 0.9rem;
    border-radius: 999px;
    margin-right: auto;
    margin-top: 10px;
    box-shadow: ${({ theme }): string => theme.depth[0]};
    ${transition(['background-color'])}
    &:hover, &:focus {
        background-color: #b22330;
    }
    &:active {
        background-color: #6c121a;
    }
`;

const CropWrapper = styled.div`
    ${flex('row', 'center')}
    background-color: ${({ theme }): string => theme.colors.input.default};
    
`;
const ButtonDiv = styled.div`
    margin: 15px 25px;
`;
