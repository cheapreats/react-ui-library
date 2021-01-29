import React from 'react';
import styled from 'styled-components';
import { Heading, Paragraph } from '@Text';
import { Button } from '@Inputs';
import { PhoneCall } from '@styled-icons/boxicons-solid/PhoneCall';

export interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
    visitCount: string,
    profileName: string,
    lastVisitedDate: string,

}

export const ProfileCard: React.FC<ProfileCardProps> = ({
    visitCount,
    profileName = 'Ashley DavidSon Moooo',
    lastVisitedDate,
    ...props
}): React.ReactElement => (
    <Container {...props}>
        <LeftContainer>
            <ProfilePhoto>
                <VisitCount>
                    <VisitCountText>{visitCount}</VisitCountText>
                </VisitCount>
            </ProfilePhoto>
            <ProfileCardContainer>
                <TopProfileInfoContainer>
                    <ProfileName>{profileName}</ProfileName>
                    <CallButton icon={PhoneCall}>Call</CallButton>
                </TopProfileInfoContainer>
                <HorizontalLine  />
                <BottomProfileInfoContainer>
                    <LastVisitedDate>Last Visited: {lastVisitedDate}</LastVisitedDate>
                </BottomProfileInfoContainer>
            </ProfileCardContainer>
        </LeftContainer>
    </Container>
);

const Container = styled.div`
  width: 640px;
  height: 150px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
`;

const LeftContainer = styled.div`
  width: 415px;
  height: 150px;
  background-color: ${({theme }) => theme.colors.primary};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfilePhoto = styled.div`
  border: 5px solid rgba(255, 215, 112, 1);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  width: 110px;
  height: 110px;
  border-radius: 999px;
  z-index: 10;
  background-color: grey;
`;

const VisitCount = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 999px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background: rgba(237, 36, 42, 1);
  border: 2px solid rgba(255, 255, 255, 1);
  position: absolute;
  // Height of Photo + Half Height of Self
  top: 120px;
  z-index: 11;
`;

const VisitCountText = styled(Paragraph)`
  padding: 0;
  margin: 0;
  color: white;
  text-align: center;
  z-index: 12;
`;

const ProfileCardContainer = styled.div`
  width: 280px;
  height: 80px;
  background-color: white;
  border-radius: 10px;
  flex-direction: row;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  margin-left: -22px;
`;

const ProfileName = styled.p`
  font-size: 25px;
  float: left;
  margin: 0;
  padding: 0;
  width: 140px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const CallButton = styled(Button)`
  height: 30px;
  margin-left: auto;
`;

const HorizontalLine = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 0;
  padding: 0;
`;

const TopProfileInfoContainer = styled.div`
  flex: 1 0;
  flex-direction: row;
  height: 28px;
  align-items: center;
  padding: 12px 10px 12px 30px;
`;

const BottomProfileInfoContainer = styled.div`
  flex-direction: row;
  height: 26px;
  align-items: center;
  padding: 2px 10px 2px 30px;
`;

const LastVisitedDate = styled(Paragraph)`
  color: rgba(145, 145, 145, 1);
  font-size: 12px;
  align-self: center;
`;
