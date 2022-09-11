import { Box, styled, Typography } from '@mui/material';


const Banner = styled(Box)`
    background: url(https://i.im.ge/2022/08/05/FcYyxG.DSC-7674.jpg) center/100%;
    width: 100%;
    height: 60vh;
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

const About = () => {

    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h3"> Hi, I am Manika Dalela.</Typography>
                <Text variant="h5">I am a Software Engineer based in India. 
                    I like to read, write, sing, bake, travel, play with cats and (even though I don't like it always) to think too much.
                    (Hoping that writing here would help with that!)
                    </Text>
            </Wrapper>
        </Box>
    )
}

export default About;

