import React from 'react';
import { FaGithubAlt } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiOutlineMail } from 'react-icons/ai';
import { styled } from '../../../stitches.config';

const Container = styled('div', {
    borderTop: '2px solid $text',
    height: '5rem',
    position: 'relative',
    transform: 'translateY(-100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    '@lg': {},
});

const Github = styled(FaGithubAlt, {
    height: '1.5rem',
    width: '1.5rem',
    marginLeft: '0.5rem',
    cursor: 'pointer',
    '@lg': { width: '1.8rem', height: '1.8rem' },
});

const Mail = styled(AiOutlineMail, {
    height: '1.5rem',
    width: '1.5rem',
    marginRight: '0.5rem',
    cursor: 'pointer',
    '@lg': { width: '1.8rem', height: '1.8rem' },
});

const ContactUs = styled('div', {
    marginTop: '1.5rem',
    fontSize: '1.2rem',
    '@lg': { fontSize: '1.4rem' },
});

const Location = styled('div', {
    fontSize: '0.1rem',
    '@lg': { fontSize: '0.7rem' },
});

const email = 'rjsduf0503@gmail.com';
const site = 'https://github.com/2022-CNU-Capstone-Design-1/scripts-frontend';

export default function Footer(): JSX.Element {
    const handleMailClick = () => {
        alert(`${email}이 복사되었습니다.`);
    };
    return (
        <Container>
            <ContactUs>Contact us</ContactUs>
            <div>
                <CopyToClipboard text={email}>
                    <Mail onClick={handleMailClick} />
                </CopyToClipboard>
                <Github onClick={() => window.open(site, '_blank')} />
            </div>
            <Location>대전광역시 유성구 대학로 99 공대 5호관</Location>
        </Container>
    );
}
