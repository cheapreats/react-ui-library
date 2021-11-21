import React from 'react';
export interface IHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    topLeft?: string | JSX.Element;
    bottomLeft?: string | JSX.Element;
    topRight?: string | JSX.Element;
    bottomRight?: string | JSX.Element;
}
declare const Header: ({ topLeft, bottomLeft, topRight, bottomRight, ...props }: IHeaderProps) => React.ReactElement;
export default Header;
