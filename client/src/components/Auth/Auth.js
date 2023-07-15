import React, { useState } from 'react'
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
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isSignup) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const switchMode = () => {
        setIsSignUp(!isSignup);
        setFormData(initialState);
        setShowPassword(false);
    }

    const googleSignin = useGoogleLogin({
        onSuccess: async res => {
            try {
                const { data } = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        "Authorization": `Bearer ${res.access_token}`
                    }
                })
                // console.log("data", data)
                const result = { email: data.email, name: data.name, imageUrl: data.picture, password: "" }
                const token = data.sub;
                dispatch({ type: AUTH, data: { result, token } });
                navigate("/")
            }
            catch (error) {
                console.log(error)
            }
        }
    })
    return (
        <Container component="main" maxWidth="xs">
            <MyPaper elevation={3}>
                <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
                <MyForm onSubmit={handleSubmit}>
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
                    <SubmitButton type="submit" fullWidth variant="contained" color="primary">
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </SubmitButton>
                    {/* google sign in */}
                    <SubmitButton fullWidth variant='contained' color='primary' onClick={googleSignin}>
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
