import React, { useState } from 'react';

const MockElement = ({ init, render }: any) =>
    render(...init.map((state: any) => useState(state)));

export const mockElement = (render: any, ...initState: any) => () => (
    <MockElement render={render} init={initState} />
);
