import { useState ,useContext, useEffect} from 'react';
import { Box ,TextField, Button , styled, Typography } from '@mui/material';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';

 const Component =styled(Box)`
  width: 500px;
  margin: auto;
  box-shadow: 2px 2px 2px 2px grey;
 `;

 const Image = styled('img')({
    width: 200,
    margin: 'auto',
    display: 'flex',
});

 const Wrapper =styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div, & > button , & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #FFC0CB;
  color: #fff;
  height: 45px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 grey;
`;

const SignupButton = styled(Button)`
text-transform: none;
background: #FFC0CB;
color: #fff;
height: 45px;
border-radius: 2px;
box-shadow: 0 2px 4px 0 grey;
`;

const Error = styled(Typography)`
 font-size: 10px;
 color: #ff6161;
 line-height: 0;
 margin-top: 10px;
 font-weight: 600;
`;

const Text = styled(Typography)`
 color: #878787;
 font-size: 12px;
`
const loginInitialValues = {
  username: '',
  password: ''
};

const signupInitialValues = {
  name:'',
  username: '',
  password: ''
};

  
const Login = ({isUserAuthenticated}) => {
    
    const imageURL = 'data:image/png;base64,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';
     
   
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, showError] = useState('');
    const [account, toggleAccount] = useState('login');

    const {setAccount} = useContext(DataContext);
    const navigate =useNavigate();

    useEffect(()=>{
      showError(false);
    },[login])

    const toggleSignup = ()=>{

        account === 'signup'? toggleAccount('login') : toggleAccount('signup');
    }
    const onInputChange = (e) =>{
      setSignup({...signup, [e.target.name]:e.target.value});
    }

    const onValueChange = (e) => {
      setLogin( {...login, [e.target.name]: e.target.value });
}

    const signupUser = async() => {
        let response = await API.userSignup(signup);
        if(response.isSuccess){
          showError('');
          setSignup(signupInitialValues);
          toggleAccount('login');
        } else {
            showError('Something went wrong! Try again later');
        }
    }


    const loginUser = async () => {
      let response = await API.userLogin(login);
      if(response.isSuccess){
        showError('');

        sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
        sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);

        setAccount ({username: response.data.username, name: response.data.name});
        isUserAuthenticated(true);
        setLogin(loginInitialValues);
        navigate('/');

      } else {
        showError('Something went wrong! Try again later');
      }
    }


    return (
        <Component>
            <Box>
            <Image src={imageURL} alt="blog"/>
            {
              account === 'login' ?
              <Wrapper>
                            <TextField variant="standard" value={login.username} onChange={(e) => onValueChange(e)} name="username" label="Enter Username" />
                              <TextField variant="standard" value={login.password} onChange={(e) => onValueChange(e)} name="password" label="Enter Password" />

                             { error && <Error>{error}</Error> }
                            
                            <LoginButton variant="contained" onClick={ () => loginUser() }> Login</LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <SignupButton variant="contained" onClick={()=> toggleSignup() }>Create an account</SignupButton>
             </Wrapper>
              :
             <Wrapper>
               <TextField variant = "standard"  onChange={(e)=>onInputChange(e)} name='name' label="Enter Name" />
               <TextField variant = "standard"  onChange={(e)=>onInputChange(e)} name='username' label="Enter Username" />
              <TextField variant = "standard" onChange={(e)=>onInputChange(e)} name='password' label="Enter Password" />

              <SignupButton variant = "contained" onClick= {()=> signupUser()}> Sign Up</SignupButton> 
              <Text style={{ textAlign: 'center'}}>OR</Text>
               <LoginButton variant="contained" onClick={()=> toggleSignup()}>Already have an account</LoginButton> 
             </Wrapper>
             }
            </Box>
        </Component>
    )
}

export default Login;