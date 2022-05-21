import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'next-themes';
import reportWebVitals from './reportWebVitals';
import { darkTheme } from './stitches.config';
import Router from './router';

export default function App() {
    return (
        <ThemeProvider
            attribute='class'
            defaultTheme='system'
            value={{
                light: 'light',
                dark: darkTheme.className,
            }}
        >
            <Router />
        </ThemeProvider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

reportWebVitals();
