import { Box,Typography,styled } from "@mui/material";
const Image = styled(Box)`
    width: 100%;
    background: url(https://i.im.ge/2022/08/05/FbI4hL.jon-flobrant-JU2MgHOHDsw-unsplash.jpg) center/55% repeat-x #000;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading = styled(Typography)`
    font-size: 25px;
    color: #FFFFFF;
    line-height: 1
`;

const Banner = ()=>{
    return (
        <Image>
            <Heading>"It is our choices, Harry, that show what we truly are, far more than our abilities." </Heading>
       </Image>
    )
}
export default Banner;
