import React, { useState } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker, BaseEmoji } from 'emoji-mart';
import styled from 'styled-components';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import { ImplicitPropsInterface } from '@Utils/Hooks';
import { scroll } from '@Utils/Mixins';
import { Modal } from '@Containers';
import { Button } from '../Button/Button';

export interface EmojiPickerProps
    extends MainInterface,
        ResponsiveInterface,
        ImplicitPropsInterface {
    onChange?: Function;
    showEmoji?: boolean;
    text?: string;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({
    onChange = (): void => undefined,
    text = 'Pick an Emoji',
}): React.ReactElement => {
    const modal = useState(false);
    return (
        <>
            <Button onClick={(): void => modal[1](true)}>{text}</Button>
            <ModalStyled width="auto" state={modal}>
                <Picker
                    onSelect={({ native }: BaseEmoji): void => {
                        onChange(native);
                        modal[1](false);
                    }}
                />
            </ModalStyled>
        </>
    );
};

const ModalStyled = styled(Modal)`
    & .emoji-mart-scroll {
        ${scroll}
    }
`;
