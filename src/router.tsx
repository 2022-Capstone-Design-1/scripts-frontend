import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Download from './pages/download';
import Header from './components/layouts/header';

export default function Router() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/download/:id' element={<Download />} />
            </Routes>
        </BrowserRouter>
    );
}
