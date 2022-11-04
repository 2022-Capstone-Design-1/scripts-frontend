import { ThemeProvider } from 'next-themes';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Router from './router';
import { darkTheme } from './stitches.config';

export default function App(): JSX.Element {
    return (
        <ThemeProvider
            attribute='class'
            defaultTheme='dark'
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
