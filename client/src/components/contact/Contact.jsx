import { Box, styled, Typography, Link } from '@mui/material';
import { Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background: url(https://i.im.ge/2022/08/15/OOUDpG.IMG-20170828-202946.jpg) center/100%;
    width: 100%;
    height: 100vh;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

const Contact = () => {

    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Text variant="h5">
                    You can reach out to me on:
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.instagram.com/manikadalela/" color="inherit" target="_blank">
                            <Instagram />
                        </Link>
                    </Box>  
                        or send me an Email 
                        <Link href="mailto:manidalela@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                            <Email />
                        </Link>.
                </Text>
            </Wrapper>
        </Box>
    )
}

export default Contact;

