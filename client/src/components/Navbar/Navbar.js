import React, { useEffect, useState } from 'react'
import { MyAppBar, Heading, Image, LogoContainer, Profile, UserName, MyToolBar, MyButton } from './styles'
import projects from '../../images/projects.png'
import { Link } from 'react-router-dom'
import { Button, Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { LOGOUT } from '../../constants/posts'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import decode from 'jwt-decode';
function Navbar() {
    // let user = null;
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const logout = () => {
        dispatch({ type: LOGOUT });
        navigate('/');
        setUser(null);
        window.location.reload();
    };
    return (
        <MyAppBar position="static" color="inherit">
            <LogoContainer>
                <Heading variant="h3" align="center" >Projects</Heading>
                <Image src={projects} alt="icon" height="60" />
            </LogoContainer>
            <MyToolBar>
                {user?.result ? (
                    <Profile>
                        <Avatar color="primary" alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                        <UserName variant="h6">{user?.result.name}</UserName>

                        <MyButton variant="contained" color="secondary" onClick={logout}>
                            Logout
                        </MyButton>


                    </Profile>
                ) : (
                    <MyButton variant="contained" onClick={()=>navigate("/auth")}>
                        Sign In
                    </MyButton>
                )}
            </MyToolBar>
        </MyAppBar>
    )
}

export default Navbar
