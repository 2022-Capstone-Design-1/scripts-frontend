import React from 'react';
import { useTheme } from 'next-themes';
import { BiBulb } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { styled } from '../../../stitches.config';

const Container = styled('div', {
    borderBottom: '2px solid $text',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '4rem',
    position: 'sticky',
    top: '0',
    zIndex: 101,
    backgroundColor: '$background',
    '@lg': { height: '5rem' },
});

const Bulb = styled(BiBulb, {
    height: '1.5rem',
    width: '1.5rem',
    margin: '0 2rem',
    cursor: 'pointer',
    '@lg': { width: '1.8rem', height: '1.8rem' },
});

const Logo = styled('h1', {
    margin: '0 2rem',
    fontSize: '2rem',
    letterSpacing: '-0.4rem',
    height: '2rem',
    cursor: 'pointer',
    '@lg': { fontSize: '3rem', height: '3rem' },
});

export default function Header(): JSX.Element {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
    const navigate = useNavigate();

    return (
        <Container>
            <Logo onClick={() => navigate('/')}>VTS</Logo>
            <Bulb onClick={toggleTheme} />
        </Container>
    );
}
