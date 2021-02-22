import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface IBoxProps extends IDivProps, IImgProps {
    imgSrc: string;
}

export interface IBoxComposition2Props
    extends React.HTMLAttributes<HTMLDivElement> {
    desktopBox: IBoxProps;
    mobileBox: IBoxProps;
    notificationBox: IBoxProps;
}

export const BoxComposition2: React.FC<IBoxComposition2Props> = ({
    desktopBox,
    mobileBox,
    notificationBox,
    ...props
}): React.ReactElement => {
    const [showBox2, setShowBox2] = useState(false);
    const [showBox3, setShowBox3] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setShowBox2(true);
        }, 1000);
        setTimeout(() => {
            setShowBox3(true);
        }, 2000);
    }, []);
    return (
        <div {...props}>
            <DesktopBox {...desktopBox} />
            {showBox2 && <MobileBox {...mobileBox} />}
            {showBox3 && <NotificationBox {...notificationBox} />}
        </div>
    );
};

const NotificationBox: React.FC<IBoxProps> = ({
    imgSrc,
    top,
    left,
    ...props
}): React.ReactElement => (
    <AnimatedNotificationDiv top={top} left={left}>
        <Img src={imgSrc} {...props} />
    </AnimatedNotificationDiv>
);

const MobileBox: React.FC<IBoxProps> = ({
    imgSrc,
    top,
    left,
    ...props
}): React.ReactElement => (
    <AnimatedMobileDiv top={top} left={left}>
        <Img src={imgSrc} {...props} />
    </AnimatedMobileDiv>
);

const DesktopBox: React.FC<IBoxProps> = ({
    imgSrc,
    top,
    left,
    ...props
}): React.ReactElement => (
    <AnimatedDesktopDiv top={top} left={left}>
        <Img src={imgSrc} {...props} />
    </AnimatedDesktopDiv>
);

interface IDivProps {
    top: number;
    left: number;
}

const AnimatedDesktopDiv = styled.div<IDivProps>`
    position: absolute;
    ${({ top, left }): string => `
top:${top}px;
animation:anim1 1s forwards;
@keyframes anim1{
    from{left:0px;}
    to{left:${left}px;}
}
`}
`;

const AnimatedMobileDiv = styled.div<IDivProps>`
    position: absolute;
    ${({ top, left }): string => `
left:${left}px;
animation:anim2 1s forwards;
@keyframes anim2{
    from{top:100px;}
    to{top:${top}px;}
}
`}
`;

const AnimatedNotificationDiv = styled.div<IDivProps>`
    position: absolute;
    ${({ top, left }): string => `
top:${top}px;
left:${left}px;
animation:anim3 1s forwards;
@keyframes anim3{
    0%{transform:scale(.8,.8);}
    96%{transform:scale(1.1,1.1);}
    100%{transform:scale(1,1);}
}
`}
`;

interface IImgProps {
    width: number;
    height: number;
    borderRadius: number;
}

const Img = styled.img<IImgProps>`
    ${({ width, height, borderRadius }): string => `
width:${width}px;
height:${height}px;
border-radius:${borderRadius}px;
`}
`;
