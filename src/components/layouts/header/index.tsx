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

const Logo = styled('img', {
    margin: '0 2rem',
    width: '4rem',
    height: '2rem',
    cursor: 'pointer',
    '@lg': { width: '5rem', height: '2.5rem' },
});

export default function Header(): JSX.Element {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => setTheme(theme === 'light' ? 'orange' : 'light');
    const navigate = useNavigate();

    return (
        <Container>
            <Logo
                src={require(`../../../assets/images/${theme}logo.png`)}
                alt='Logo'
                onClick={() => navigate('/')}
            />
            <Bulb onClick={toggleTheme} />
        </Container>
    );
}
