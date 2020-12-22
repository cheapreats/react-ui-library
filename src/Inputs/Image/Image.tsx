import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FileUpload } from '@styled-icons/fa-solid/FileUpload';
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop from 'react-image-crop';
import styled from 'styled-components';

import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import { ImplicitPropsInterface } from '@Utils/Hooks';
import { position, flex } from '@Utils/Mixins';
import { Heading } from '@Text/Heading';
import { Modal } from '@Containers';
import { Button } from '../Button/Button';

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
    onImageReturn = (): void => {
        return undefined;
    },
    drawImage = (): void => {
        return undefined;
    },
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
    const [modal, setModal] = useState(false);
    const imgRef = useRef<HTMLImageElement>();

    useEffect((): void => {
        URL.revokeObjectURL(image);
    }, []);

    const onUpload = useCallback(
        ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
            if (image) URL.revokeObjectURL(image);
            if (!target.files) return;
            const file = target.files[0];
            if (file && file.type.match(accept)) {
                const reader = new FileReader();
                reader.addEventListener('load', () =>
                    setImage(reader.result as string),
                );
                reader.readAsDataURL(file);
                setModal(true);
                target.value = '';
            }
        },
        [accept, image],
    );

    const onSubmit = useCallback(() => {
        if (imgRef.current && crop.width && crop.height) {
            const croppedImageUrl = cropImageAndFormat(imgRef.current);
            if (croppedImageUrl) {
                onImageReturn(croppedImageUrl);
            }
        }
    }, [imgRef.current, crop]);

    const onClose = useCallback((): void => {
        URL.revokeObjectURL(image);
        setCrop({ ...crop, aspect });
        setImage('');
    }, []);

    const onCrop = useCallback((e) => {
        setCrop(e);
    }, []);

    const onImageLoaded = useCallback((theImage: HTMLImageElement) => {
        imgRef.current = theImage;
    }, []);

    const cropImageAndFormat = useCallback(
        (initialImage: HTMLImageElement): string | boolean => {
            const canvas = document.createElement('canvas');
            const scaleX = initialImage.naturalWidth / initialImage.width;
            const scaleY = initialImage.naturalHeight / initialImage.height;
            canvas.width = crop.width;
            canvas.height = crop.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(
                    initialImage,
                    crop.x * scaleX,
                    crop.y * scaleY,
                    crop.width * scaleX,
                    crop.height * scaleY,
                    0,
                    0,
                    crop.width,
                    crop.height,
                );
                ctx.canvas.toBlob((blob: Blob | null): void => {
                    drawImage(URL.createObjectURL(blob));
                });
                const base = canvas.toDataURL('image/jpeg');
                setModal(false);
                return base;
            }
            return false;
        },
        [crop, drawImage],
    );

    return (
        <>
            <Button icon={FileUpload} {...props}>
                Upload Image
                <Drop type="file" accept={accept} onChange={onUpload} />
            </Button>
            <Modal
                padding="20px 25px"
                state={[modal, setModal]}
                onClose={onClose}
            >
                <Heading type="h3" bold>
                    Crop Image
                </Heading>
                <CropWrapper>
                    <ReactCrop
                        src={image}
                        crop={crop}
                        onChange={onCrop}
                        onImageLoaded={onImageLoaded}
                    />
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
