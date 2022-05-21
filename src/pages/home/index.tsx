import React from 'react';
import { useTheme } from 'next-themes';
import { styled } from '../../stitches.config';

const Button = styled('button', {});

export default function Home() {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
    return (
        <div>
            <h1>The current theme is {theme === 'dark' ? 'dark' : 'light'}</h1>
            <Button onClick={toggleTheme}>Change Theme</Button>
        </div>
    );
}
