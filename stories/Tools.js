import React, { useState } from 'react';

const MockElement = ({ init, render }) =>
    render(...init.map(state => useState(state)));

export const mockElement = (render, ...initState) => () => (
    <MockElement render={render} init={initState} />
);
