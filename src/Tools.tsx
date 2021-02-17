import React, { ReactElement, useState } from 'react';

type MockElementType = ({ init, render }: any) => any;

const MockElement: MockElementType = ({ init, render }) =>
    render(...init.map((state: any) => useState(state)));

type mockElementType = (render: any, ...initState: any) => ReactElement;

export const mockElement: mockElementType = (render, ...initState) => (
    <MockElement render={render} init={initState} />
);
