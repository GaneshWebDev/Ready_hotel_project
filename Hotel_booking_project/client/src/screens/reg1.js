import React,{useEffect,useState} from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Error from '../components/error';
import Success from '../components/success';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import Loading from '../components/loading';

function Register() {
    const [loading,setloading]=useState(false);
    const [error,setError]=useState(false);
    const [success,setSuccess]=useState(false);
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [cpassword,setCpassword]=useState('');
    function regProcess(){
        if(password==cpassword){
            const user={
                name,
                email,
                password
            }
            try {
                setloading(true);
                axios.post('/register',user).then(
                    response=>{
                        console.log(`successfully create ${response}`);
                        setloading(false);
                        setSuccess(true);
                    }
                )
            } catch (error) {
                setError(true);
                console.log(error);
            }
            setName('');
            setEmail('');
            setPassword('');
            setCpassword('');
        }else{
            alert("wrong passwod re-enter paswword");
            setPassword('');
            setCpassword('');
        }
        
    }
    if(loading){
        return(<Loading/>)
    }else if(error){
        return(<Error/>)
    }
  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
      <div className='mask gradient-custom-2'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          {success?<Success message={'successfully registered'}/>:<h2 className="text-uppercase text-center mb-5">Create an account</h2>}
          <MDBInput wrapperClass='mb-4' placeholder='Your Name' size='lg' id='form1' type='text' required value={name} onChange={(e)=>{setName(e.target.value)}} />
          <MDBInput wrapperClass='mb-4' placeholder='Email' size='lg' id='form2' type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required="true"/>
          <MDBInput wrapperClass='mb-4' placeholder='Password' size='lg' id='form3' type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required="true"/>
          <MDBInput wrapperClass='mb-4' placeholder='Confirm Password' size='lg' id='form4' type='password' value={cpassword} onChange={(e)=>{setCpassword(e.target.value)}} required="true"/>
          <Button className='mb-4 w-100 gradient-custom-4' onClick={regProcess}>Register</Button>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;