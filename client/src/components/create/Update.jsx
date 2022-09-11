import { useState,useEffect,useContext } from "react";
import { Box,styled,FormControl,InputBase, Button,TextareaAutosize } from "@mui/material";
import {AddCircle as Add} from "@mui/icons-material";
import { useLocation ,useNavigate , useParams} from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";

const Container = styled(Box)(({theme})=>({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]:{
        margin: 0
    }
}));

const StyledFormControl =styled(FormControl)`
  margin-top:10px;
  display:flex;
  flex-direction:row;
`
const InputTextField=styled(InputBase)`
 flex:1;
 margin:0 30px;
 font-size:25px;
`;
const Textarea= styled(TextareaAutosize)`
   width:100%;
   margin-top:50px;
   font-size:18px;
   border:none;
   &:focus-visible{
    outline:none;
   }
`;
const Image =styled('img')({
    width:'100%',
    height:'50vh',
    objectFit:'cover'
});

const initialPost ={
    title:'',
    description:'',
    picture:'',
    username:'',
    categories:'',
    createdDate: new Date()
}
const Update = () => {
    

    const location=useLocation();
    const navigate=useNavigate();
    const { id } = useParams();
    
    const [post,setPost]=useState(initialPost);
    const [file,setFile]=useState('');
    const {account}=useContext(DataContext);

    const url = post.picture ? post.picture : 'https://i.im.ge/2022/08/05/FbI4hL.jon-flobrant-JU2MgHOHDsw-unsplash.jpg';

    useEffect (() => {
       const fetchData = async () =>{
         let response = await API.getPostById(id);
         if(response.isSuccess){
            setPost(response.data);
         }
       }
       fetchData();
    },[])
    
    
    useEffect(()=>{
        const getImage=async() => {
           if(file){
              const data=new FormData();
              data.append("name",file.name);
              data.append("file",file);
              //API Call
              const response= await API.uploadFile(data); 
              post.picture=response.data;
           }
        }
        getImage();
        post.categories=location.search?.split('=')[1]||'All';
        post.username=account.username
      },[file]
      )
      const updateBlogPost = async() =>{
        let response = await API.updatePost(post);
        if(response.isSuccess){
            navigate(`/details/${id}`);
        }
     }


    const handleChange= (e)=>{
        setPost({...post,[e.target.name]:e.target.value})
    }
    
    
   
    return (
        <Container>
            <Image src ={url} alt="banner"/>
            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                 type="file" 
                 id= "fileInput" 
                 style= {{display: 'none'}}
                 onChange={(e)=>setFile(e.target.files[0])} />

                 <InputTextField placeholder="Title" value={post.title} onChange={(e) => handleChange(e)} name='title'/>
                 <Button variant="contained" onClick={()=>updateBlogPost()} color="primary">Update</Button>
            </StyledFormControl>

            <Textarea
              minRows={5}
              placeholder="Go on then!"
              name='description'
              onChange={(e) => handleChange(e)}  
              value= {post.description}
              />
        </Container>
    )
}
  

export default Update;
