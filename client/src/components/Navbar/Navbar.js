import React, { useEffect, useState } from 'react'
import { Image, LogoContainer, UserName, MyButton } from './styles'
import projects from '../../images/text.png';
import projectText from '../../images/drive.png'
import { Link } from 'react-router-dom'
import { Avatar, useTheme, AppBar, styled, Toolbar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { LOGOUT } from '../../constants/posts'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import decode from 'jwt-decode';

function Navbar() {

    // let user = null;
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const MyAppBar = styled(AppBar)({
        position: "fixed",
        top: "0px",
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            width:"90%"
        },
        zIndex: 1000,
        width:"95%",
    })

    const MyToolBar = styled(Toolbar)({
        display: 'flex',
        justifyContent: 'flex-end',
        width: '400px',
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
        },
    })

    const Profile = styled('div')({
        display: 'flex',
        justifyContent: 'space-between',
        width: '400px',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
            marginTop: 20,
            justifyContent: 'center',
        },
    })

    useEffect(() => {
        const token = user?.token;

        if (token) {
            var decodedToken = decode(token);
            // console.log(decode,token)
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
        <MyAppBar position="static" color="inherit" >
            <LogoContainer to="/" >
                <img component={Link} to="/" src={projectText} alt="icon" height="70px" />
                <Image src={projects} alt="icon" height="55px" />
            </LogoContainer>
            {/* <LogoContainer>
                <Heading variant="h3" align="center" ></Heading>
                <Image src={projects} alt="icon" height="60" />
            </LogoContainer> */}
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
                    <MyButton variant="contained" onClick={() => navigate("/auth")}>
                        Sign In
                    </MyButton>
                )}
            </MyToolBar>
        </MyAppBar>
    )
}

export default Navbar
