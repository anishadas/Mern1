import React, { useContext, useState } from 'react'
import { MyAvatar, MyPaper, MyForm, SubmitButton } from './styles'
import { Button, Grid, Typography, Container } from '@mui/material';
import Input from './Input';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { signup, signin } from '../../actions/auth';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleIcon from '@mui/icons-material/Google';

import axios from 'axios';
import { AUTH } from '../../constants/posts';
const initialState = { fname: '', lname: '', email: '', password: '', confirmPassword: '' };

function Auth() {
    const [formData, setFormData] = useState(initialState);
    const [isSignup, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const localLogin = async (e) => {
        e.preventDefault();
        console.log(formData)
        // const res = await axios({
        //     method: "POST",
        //     data: formData,
        //     withCredentials: true,
        //     url: 'http://localhost:5000/auth/locallogin',
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        // });
        // navigate(0)
        dispatch(signin(formData,navigate))
        // if (res.status === 200) {
        //     navigate('/posts');
        //     // let user = res?.data?.user
        //     // navigate(0)
        // }
        // if (res.status === 201) {
        //     alert(res.data.message);
        //     navigate(0);
        //     // setController(false);
        // }
    }
    const localRegister = async () => {
        // e.preventDefault();

        // if (isSignup) {
        dispatch(signup(formData, navigate));
        // } else {
        //     dispatch(signin(formData, navigate));
        // }

        // const res = await axios({
        //     method: "POST",
        //     data: formData,
        //     withCredentials: true,
        //     url: "http://localhost:5000/auth/register",
        //     headers: {
        //         "Content-Type":"application/json"
        //     },
        // })
        // console.log(res);
        // if (res.status === 200) {
        //     alert("User created successfully, please sign in to continue");
        //     window.location.reload();
        //     // switchMode();
        // }
        // if (res.status === 201) {
        //     alert(res.data.message);
        //     // window.location.reload();
        //     // switchMode();
        // }

    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const switchMode = () => {
        setIsSignUp(!isSignup);
        setFormData(initialState);
        setShowPassword(false);
    }

    const google = async () => {
        window.open('http://localhost:5000/auth/google', "_self");
    }
    return (
        <Container component="main" maxWidth="xs">
            <MyPaper elevation={3}>
                <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
                <MyForm>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="fname" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lname" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    {isSignup ? (
                        <SubmitButton fullWidth variant="contained" color="primary" onClick={localRegister}>
                            Sign Up
                        </SubmitButton>
                    ) : (
                        <SubmitButton fullWidth variant="contained" color="primary" onClick={(e) => localLogin(e)}>
                            Sign In
                        </SubmitButton>
                    )}

                    {/* google sign in */}
                    <SubmitButton fullWidth variant='contained' color='primary' onClick={google}>
                        <GoogleIcon />&nbsp;&nbsp;
                        {isSignup ? 'Sign Up with Google' : 'Sign In with Google'}
                    </SubmitButton>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </MyForm>
            </MyPaper>
        </Container>
    )
}

export default Auth
