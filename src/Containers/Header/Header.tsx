import React from 'react';
import styled from 'styled-components';

export interface IHeaderProps {
    /* string or JSX component for top left of header */
    topLeft?: string | JSX.Element;
    /* string or JSX component for bottom left of header */
    bottomLeft?: string | JSX.Element;
    /* string or JSX component for top right of header */
    topRight?: string | JSX.Element;
    /* string or JSX component for bottom right of header */
    bottomRight?: string | JSX.Element;
}

const Header = ({
    topLeft,
    bottomLeft,
    topRight,
    bottomRight,
    ...props
}: IHeaderProps): React.ReactElement => (
    <HeaderContainer {...props}>
        <HeaderLeft>
            <TopLeft>{topLeft}</TopLeft>
            <BottomLeft>{bottomLeft}</BottomLeft>
        </HeaderLeft>
        <HeaderRight>
            <TopRight>{topRight}</TopRight>
            <BottomRight>{bottomRight}</BottomRight>
        </HeaderRight>
    </HeaderContainer>
);

const TopLeft = styled.div``;
const TopRight = styled.div``;
const BottomRight = styled.div``;
const BottomLeft = styled.div``;

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const HeaderLeft = styled.div`
    display: flex;
    flex-direction: column;
`;

const HeaderRight = styled.div`
    display: flex;
    flex-direction: column;
`;
export default Header;
