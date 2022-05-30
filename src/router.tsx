import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Script from './pages/script';
import { styled } from './stitches.config';
import Header from './components/layouts/header';
import Footer from './components/layouts/footer';

const Wrapper = styled('div', {
    height: 'auto',
    minHeight: 'calc(100vh - 4rem)',
    marginBottom: '5rem',
    zIndex: 0,
    '@lg': { minHeight: 'calc(100vh - 5rem)' },
});

export default function Router(): JSX.Element {
    return (
        <BrowserRouter>
            <Header />
            <Wrapper>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/script/:id' element={<Script />} />
                </Routes>
            </Wrapper>
            <Footer />
        </BrowserRouter>
    );
}
