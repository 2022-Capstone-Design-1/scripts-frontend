import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { Add, Close, GitHub, EmailOutlined } from '@mui/icons-material';
import { useTheme } from 'next-themes';
import { styled } from '../../../stitches.config';
import { ADDRESS, EMAIL } from '../../../utils/constants';

const Container = styled(Box, {
    '& > :not(style)': { m: 1 },
    position: 'fixed',
    right: '2rem',
    bottom: '2rem',
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '11rem',
});

export default function FloatingActionButton() {
    const [visible, setVisible] = React.useState(false);
    const { theme } = useTheme();
    const iconColor = theme === 'light' ? 'white' : 'black';
    const bgColor = theme === 'dark' ? 'white' : 'black';

    const handleMailClick = () => {
        alert(`${EMAIL}이 복사되었습니다.`);
    };

    return (
        <Container>
            {visible ? (
                <>
                    <Fab
                        aria-label='close'
                        style={{ color: `${iconColor}`, backgroundColor: `${bgColor}` }}
                    >
                        <Close onClick={() => setVisible(!visible)} />
                    </Fab>
                    <Fab
                        size='medium'
                        aria-label='github'
                        style={{ color: `${iconColor}`, backgroundColor: `${bgColor}` }}
                    >
                        <GitHub onClick={() => window.open(ADDRESS, '_blank')} />
                    </Fab>
                    <Fab
                        size='medium'
                        color='inherit'
                        aria-label='email'
                        style={{ color: `${iconColor}`, backgroundColor: `${bgColor}` }}
                    >
                        <EmailOutlined onClick={() => handleMailClick()} />
                    </Fab>
                </>
            ) : (
                <Fab
                    aria-label='add'
                    style={{ color: `${iconColor}`, backgroundColor: `${bgColor}` }}
                >
                    <Add onClick={() => setVisible(!visible)} />
                </Fab>
            )}
        </Container>
    );
}
