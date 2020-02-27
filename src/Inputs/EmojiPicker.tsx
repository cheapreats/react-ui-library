import React, { useState } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker, BaseEmoji } from 'emoji-mart';
import styled from 'styled-components';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import { ImplicitPropsInterface } from '@Utils/Hooks';
import { Modal } from '../Containers';
import Button from './Button';

export interface EmojiPickerProps
    extends MainInterface,
        ResponsiveInterface,
        ImplicitPropsInterface {
    onChange: Function;
    showEmoji: boolean;
    text: string;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({
    onChange = (): void => {},
    showEmoji = true,
    text = 'Pick an Emoji',
}) => {
    const [emoji, setEmoji] = useState('');
    const modal = useState(false);
    return (
        <div>
            <ButtonStyled
                onClick={() => modal[1](true)}
                hasEmoji={showEmoji && !!emoji}
            >
                {!!emoji && showEmoji ? emoji : text}
            </ButtonStyled>
            <ModalStyled state={modal}>
                <Picker
                    onSelect={({ native }: BaseEmoji) => {
                        setEmoji(native);
                        onChange(native);
                        modal[1](false);
                    }}
                />
            </ModalStyled>
        </div>
    );
};
const ModalStyled = styled(Modal)`
    width: 338px;
`;
const ButtonStyled = styled(Button)<{
    hasEmoji?: boolean;
}>`
    ${({ hasEmoji }) => `font-size: ${hasEmoji ? '2.5rem' : 'inherit'}`};
`;
