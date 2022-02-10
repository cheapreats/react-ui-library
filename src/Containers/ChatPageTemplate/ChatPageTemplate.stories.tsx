import Button from '@Inputs/Button/Button';
import { ChatPageTemplate, IChatPageProps } from './ChatPageTemplate';
import { flex, scroll, transition } from '@Utils/Mixins';
import { Heading } from '@Text/Heading';
import { InputFragment } from '@Layouts/InputFragment';
import Loading from '@Containers/Loading/Loading';
import { MainTheme } from "@Themes/MainTheme";
import { Microphone, ShoppingCart } from 'styled-icons/fa-solid';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import SmallText from '@Text/SmallText/SmallText';
import Snowfall from 'react-snowfall';
import styled from 'styled-components';
import { Tag } from '@Containers/Tag/Tag';
import VoiceButton from '@Inputs/VoiceButton/VoiceButton';
import { Card } from '@Containers/Card/Card';

const isLoading = false;
const isPopUpVisible = false;

const shoppingCartDisplayProps = {
    icon: ShoppingCart,
    primary: true,
    iconSize: "25px",
    margin: '0 0 0 auto',
}

const StyledFieldSet = styled.fieldset`
  border-top: 1px solid #8a8a8a;
  border-bottom: none;
  border-left: none;
  border-right: none;
  display: block;
  text-align: center;
  margin-top: 10px;
  width: 100%;
`;

const StyledTag = styled(Tag)`
    ${({ theme }): string => `
    background-color: ${theme.colors['background']};
    `}
`;

export default {
    title: 'Voice User Interface/ChatPage/ChatPage Template',
    component: ChatPageTemplate,
    args: {
        isPopUpVisible: isPopUpVisible,
        isLoading: isLoading,
        loadingChildren: (
            <>
            <Loading loading={isLoading} />
            <Snowfall color={MainTheme.colors.primary} />
            </>
        ),
        popUpChildren: (
          <>
            <Heading>Hey there User!</Heading>
            <Button {...shoppingCartDisplayProps}>
                0 | $0
            </Button>
          </>
        ),
        chatContainerChildren: (
            <div style={{
              height: "calc(100% - 275px)",
              backgroundColor: 'rgba(238, 238, 238, 0.25)',
            }} 
            />
        ),
        inputChildren: (
            <>
                <VoiceButton 
                    icon={Microphone}
                    iconSize='20px'
                />
                <StyledFieldSet>
                  <legend>
                    <SmallText>OR</SmallText>
                  </legend>
                </StyledFieldSet>
                <div>
                    <StyledTag>{'Place Order'}</StyledTag>
                    <StyledTag>{'Cancel Order'}</StyledTag>
                    <StyledTag>{'List Orders'}</StyledTag>
                    <StyledTag>{'Done'}</StyledTag>
                </div>
                <InputFragment 
                    type='text'
                    id='name'
                    placeholder='Type your response...'
                    width={'50%'}
                />
                <Button 
                  primary={false} 
                  color={MainTheme.colors.background}  
                  children={'Submit'}/>
            </>

        ),
    },
}

export const Basic: Story<IChatPageProps> = (args) => (
    <ChatPageTemplate {...args} />
);