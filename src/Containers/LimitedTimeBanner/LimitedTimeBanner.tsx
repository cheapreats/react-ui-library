import React from 'react';
import styled from 'styled-components';
import {Clock} from '@styled-icons/bootstrap/Clock';
import { MainInterface} from '@Utils/BaseStyles';

export interface LimitedTimeBannerProps
    extends MainInterface {
        hoursRemaining: number,
}

export const LimitedTimeBanner: React.FC<LimitedTimeBannerProps> = ({
    hoursRemaining,...props
}): React.ReactElement => (
    <BannerBox {...props}>
        <Icon />
        <p>{hoursRemaining} Hours Remaining</p>
    </BannerBox>
) ;

const BannerBox = styled.div`
    ${({theme}):string => `
    font-family: ${theme.font.family};
    color: ${theme.colors.background}};
    `}
    background-color: rgba(0,0,0,0.5);
    font-size: 25px;
    text-align: center;
    width: 350px;
    height: 40px; 
`;

const Icon = styled(Clock)`
    width: 25px;
    float: left;
    padding-top:5px;
    padding-bottom:5px;
    padding-left: 5px;
`;

export default LimitedTimeBanner;