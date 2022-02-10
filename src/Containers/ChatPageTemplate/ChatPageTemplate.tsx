import { flex } from '@Utils/Mixins';
import React from 'react';
import styled from 'styled-components';
import Snowfall from 'react-snowfall';

const mainFramePadding = "1rem";

export interface IChatPageProps {
    isPopUpVisible?: boolean;
    isLoading?: boolean;
    loadingChildren?: React.ReactElement;
    popUpChildren?: React.ReactElement;
    inputChildren?: React.ReactElement;
    chatContainerChildren?: React.ReactElement;
}

export const ChatPageTemplate: React.FC<IChatPageProps> = ({
    isPopUpVisible = false,
    isLoading = false,
    loadingChildren,
    popUpChildren,
    inputChildren,
    chatContainerChildren,
    ...props
}): React.ReactElement => (
    <div {...props}>
        {isLoading && {loadingChildren}}
        {!isLoading && (
            <ChatPageOuterContainer>
                <ChatPageInnerContainer>
                    <StyledSnowfall />
                    {isPopUpVisible && (
                        <PopupContainer children={popUpChildren} />
                    )}
                    <ChatPageContent>
                        <ChatContainer children={chatContainerChildren} />
                        <InputContainer children={inputChildren} />
                    </ChatPageContent>
                </ChatPageInnerContainer>
            </ChatPageOuterContainer>
        )}
    </div>
);

const InputContainer = styled.div`
  ${flex("column")};
  position: absolute;
  top: calc(100% - 150px);
  width: calc(100% - calc(${mainFramePadding} * 2));
  height: calc(125px);
  justify-content: end;
`;

const ChatContainer = styled.div`
  position: absolute;
  width: calc(100% - calc(${mainFramePadding} * 2));
  height: calc(100% - 25px);
`;

const ChatPageContent = styled.div`
  min-width: 400px;
  min-height: 600px;
  width: 60%;
  height: 100%;
  background: rgba(238, 238, 238, 0.6);
  padding: ${mainFramePadding};
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  overflow-y: hidden;
  overflow-wrap: break-word;
  position: relative;
`;

const ChatPageOuterContainer = styled.div`
  display: table;
  height: 100%;
  position: absolute;
  overflow: hidden;
  width: 100%;
`;

const ChatPageInnerContainer = styled.div`
  vertical-align: middle;
  display: table-cell;

  background: linear-gradient(#ee2434, #f25e6a);
  min-height: 500px;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const PopupContainer = styled.div`
  position: absolute;
  top: 0%;
  width: 100%;
  height: 150px;
  z-index: 2;
`;

const StyledSnowfall = styled(Snowfall)`
  position: absolute;
  z-index: -1;
`;

export default ChatPageTemplate;