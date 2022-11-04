import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'next-themes';
import reportWebVitals from './reportWebVitals';
import { darkTheme } from './stitches.config';
import Router from './router';

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
