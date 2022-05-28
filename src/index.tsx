import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'next-themes';
import reportWebVitals from './reportWebVitals';
import { orangeTheme } from './stitches.config';
import Router from './router';
import Header from './components/layouts/header';
import Footer from './components/layouts/footer';

export default function App() {
    return (
        <ThemeProvider
            attribute='class'
            defaultTheme='system'
            value={{
                light: 'light',
                orange: orangeTheme.className,
            }}
        >
            <Header />
            <Router />
            <Footer />
        </ThemeProvider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

reportWebVitals();
