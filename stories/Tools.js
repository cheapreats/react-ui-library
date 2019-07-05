import React, { Fragment, useState } from 'react';

const MockElement = ({ init, render }) => (
    render(useState(init))
);

export const mockElement = (render, initState) => () => (
    <MockElement render={ render } init={ initState }/>
);