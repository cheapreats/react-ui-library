import React from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
import { ImplicitPropsInterface } from "../../Utils/Hooks";
export interface EmojiPickerProps extends MainInterface, ResponsiveInterface, ImplicitPropsInterface {
    onChange?: Function;
    showEmoji?: boolean;
    text?: string;
}
export declare const EmojiPicker: React.FC<EmojiPickerProps>;
