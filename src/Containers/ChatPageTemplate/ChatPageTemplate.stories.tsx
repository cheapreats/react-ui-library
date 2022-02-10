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

const isLoading = false;
const isPopUpVisible = false;

const Popup = styled.div<{ isHovered: boolean }>`
  ${flex("row")};
  position: relative;
  top: -50%;
  height: 50%;
  margin-left: auto;
  margin-right: auto;
  max-width: calc(800px);
  width: calc(80%);
  ${({ theme }): string => `
    background-color: ${theme.colors["background"]};
  `}
  box-shadow: 0 1mm 5mm;
  border-radius: 0 0 20px 20px;
  padding: 10px;
  z-index: 2;

  transition: 0.5s;

  ${({ isHovered }): string =>
    isHovered
      ? `
    transition: 0.25s ease-out 1;
    top: calc(0%);
  `
      : ``}
`;

const PriceDisplayHeading = styled(Heading)`
  width: 45%;
  overflow: hidden;
  margin-left: 5px;
  margin-right: auto;
`;

const PriceDisplayButton = styled(Button)`
  width: 45%;
  margin-left: auto;
  margin-right: 5px;
`;

const ScrollingList = styled.div`
  ${scroll}
  &::-webkit-scrollbar {
    background-color: rgba(0, 0, 0, 0);
  }
  ${transition(["height"])}
  height: calc(100% - 275px);
  background: rgba(238, 238, 238, 0.25);
  padding: 5px;
  padding-top: 25px;
  overflow: hidden;
  overflow-y: scroll;
  overflow-wrap: break-word;

`;

const StyledButton = styled(Button)`
  margin: 0 auto 0 auto; 
  ${({ theme }): string => `
    color: ${theme.colors['primary']};
    background-color: ${theme.colors['background']};
  `}
`;

const StyledDiv = styled.div`
    ${flex('column')};
    align-items: center;
`;

const StyledFieldSet = styled.fieldset`
  border-top: 1px solid #8a8a8a;
  border-bottom: none;
  border-left: none;
  border-right: none;
  display: block;
  text-align: center;
  margin-top: 10px;
`;

const StyledInputFragment = styled(InputFragment)`
  width: 50%;
  margin: 0 auto 10px auto;
`;

const StyledTag = styled(Tag)`
    ${({ theme }): string => `
    background-color: ${theme.colors['background']};
    `}
`;

const StyledVoiceButton = styled(VoiceButton)`
    justify-content: center;
    margin: 0 auto 0 auto;
    width: 75px;
    height: 75px;
    border-radius: 50%;
`;

const TagContainer = styled.div`
  ${flex("row")};
  justify-content: space-between;
  width: 35%;
  margin: auto auto 10px auto;
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
            <Popup isHovered={isPopUpVisible}>
                <PriceDisplayHeading>Hey there User!</PriceDisplayHeading>
                <PriceDisplayButton
                  onClick={undefined}
                  icon={ShoppingCart}
                  primary={true}
                  iconSize="25px"
                  margin="5px"
                >
                    0 | $0
                </PriceDisplayButton>
            </Popup>
        ),
        chatContainerChildren: (
            <ScrollingList />
        ),
        inputChildren: (
            <>
                <StyledVoiceButton 
                    icon={Microphone}
                    iconSize='20px'
                />
                <StyledFieldSet>
                  <legend>
                    <SmallText>OR</SmallText>
                  </legend>
                </StyledFieldSet>
                <TagContainer>
                    <StyledTag>{'Place Order'}</StyledTag>
                    <StyledTag>{'Cancel Order'}</StyledTag>
                    <StyledTag>{'List Orders'}</StyledTag>
                    <StyledTag>{'Done'}</StyledTag>
                </TagContainer>
                <StyledInputFragment 
                    type='text'
                    id='name'
                    placeholder='Type your response...'
                />
                <StyledButton children={'Submit'}/>
            </>

        ),
    },
}

export const Basic: Story<IChatPageProps> = (args) => (
    <ChatPageTemplate {...args} />
);