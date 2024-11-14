import React from 'react';
import { getByDisplayValue, getByLabelText, getByTitle, render, screen } from '@testing-library/react';
/*

Copyright (C) 2022 SE CookBook - All Rights Reserved
You may use, distribute and modify this code under the
terms of the MIT license.
You should have received a copy of the MIT license with
this file. If not, please write to: help.cookbook@gmail.com

*/

import Navbar from './Navbar';

test('shows Navbar correctly', () => {
    const {getByText} = render(<Navbar />);
    expect(getByText("Home")).toBeInTheDocument();
});

test('shows Navbar correctly', () => {
    const {getByText} = render(<Navbar />);
    expect(getByText("About")).toBeInTheDocument();
});

test('shows Navbar correctly', () => {
    const {getByText} = render(<Navbar />);
    expect(getByText("Contact")).toBeInTheDocument();
});

 