import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FileUpload } from '@styled-icons/fa-solid/FileUpload';
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop from 'react-image-crop';
import styled from 'styled-components';

import { MainInterface, ResponsiveInterface } from '../Utils/BaseStyles';
import { ImplicitPropsInterface } from '../Utils/Hooks';
import { position, flex } from '../Utils/Mixins';
import { Heading } from '../Text/Heading';
import { Button } from './Button';
import { Modal } from '../Containers/Modal';

export interface ImageProps
    extends MainInterface,
        ResponsiveInterface,
        ImplicitPropsInterface {
    accept?: string;
    aspect?: number;
    onImageReturn?: Function;
    drawImage?: Function;
}

export const Image: React.FC<ImageProps> = ({
    accept = 'image/*',
    aspect = 1,
    onImageReturn = (): void => {},
    drawImage = (): void => {},
    ...props
}): React.ReactElement => {
    const [crop, setCrop] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        aspect,
    });
    const [image, setImage] = useState('');
    const modal = useState(false);
    const img = useRef({ x: '', y: '', width: '', height: '' });

    useEffect(
        (): (() => void) => (): void => {
            URL.revokeObjectURL(image);
        },
        [],
    );

    const upload = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        if (image) URL.revokeObjectURL(image);
        if (!target.files) return;
        const file = target.files[0];

        if (file && file.type.match(accept)) {
            const modifiedImg = new window.Image();
            modifiedImg.src = URL.createObjectURL(file);
            modifiedImg.onload = (): void => {
                const elem = document.createElement('canvas');
                const modalToViewPercent = 0.675;
                const modalHeaderAndSubmitPercent = 0.71;
                const imageHeight =
                    document.documentElement.clientHeight *
                    modalToViewPercent *
                    modalHeaderAndSubmitPercent;
                const imageWidth =
                    imageHeight / (modifiedImg.height / modifiedImg.width);

                elem.width = imageWidth;
                elem.height = imageHeight;

                const ctx = elem.getContext('2d');
                if (ctx) {
                    // img.width and img.height will contain the original dimensions
                    ctx.drawImage(modifiedImg, 0, 0, imageWidth, imageHeight);

                    ctx.canvas.toBlob((blob: Blob | null): void => {
                        setImage(URL.createObjectURL(blob));
                    });
                }
            };
            modal[1](true);
            target.value = '';
        }
    };

    const onClose = useCallback((): void => {
        URL.revokeObjectURL(image);
        setCrop({ ...crop, aspect });
        img.current = { x: '', y: '', width: '', height: '' };
        setImage('');
    }, []);

    const onCrop = useCallback(async (e, i): Promise<void> => {
        setCrop(e);
        img.current = i;
    }, []);

    const onSubmit = useCallback(
        (): Promise<string> =>
            new Promise((resolve): void => {
                const { x, y, width, height } = crop;
                const canvas = document.createElement('canvas');
                if (!canvas) return;

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                const draw = new window.Image();
                draw.src = image;
                draw.onload = async (): Promise<void> => {
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
                    ctx.canvas.toBlob((blob: Blob | null): void => {
                        drawImage(URL.createObjectURL(blob));
                    });
                    const base = canvas.toDataURL('image/jpeg');
                    await onImageReturn(base);
                    modal[1](false);
                    resolve(base);
                };
                draw.src = image;
            }),
        [img.current],
    );
    return (
        <>
            <Button icon={FileUpload} {...props}>
                Upload Image
                <Drop type="file" accept={accept} onChange={upload} />
            </Button>
            <Modal padding="20px 25px" state={modal} onClose={onClose}>
                <Heading type="h3" bold>
                    Crop Image
                </Heading>
                <CropWrapper>
                    <ReactCrop src={image} crop={crop} onChange={onCrop} />
                </CropWrapper>
                <Button
                    disabled={!(crop.width + crop.height)}
                    onClick={onSubmit}
                    primary
                >
                    Crop & Finish
                </Button>
            </Modal>
        </>
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

const CropWrapper = styled.div`
    ${flex('row', 'center')}
    ${({ theme }): string => `
        background-color: ${theme.colors.input.default};
        border-radius: ${theme.dimensions.radius};
    `}
    margin: 20px 0;
`;
