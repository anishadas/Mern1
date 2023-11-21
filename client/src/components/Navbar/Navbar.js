import React, { useContext, useEffect, useState } from 'react'
import { Image, LogoContainer, UserName, MyButton } from './styles'
import projects from '../../images/text.png';
import projectText from '../../images/drive.png'
import { Link } from 'react-router-dom'
import { Avatar, useTheme, AppBar, styled, Toolbar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux';
import { getUser, logout } from '../../actions/auth';

function Navbar({ user,getUser ,message}) {
    // let user = null;
    // const [user, setUser] = useState({ name: "", email: "" });
    // const user = useSelector(state => state.users.authData);
    // console.log("data",user)
  
    let src = user?.photos ? user.photos[0].value : ""
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getUser();
    },[getUser])
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
            width: "90%"
        },
        zIndex: 1000,
        width: "95%",
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

    const signout = async (e) => {
        e.preventDefault();
        // window.open('http://localhost:5000/auth/logout', "_self");
        dispatch(logout())
        // navigate('/');
        // setUser(null);
        // window.location.reload();
    };

    return (
        <MyAppBar position="static" color="inherit" >
            <LogoContainer to="/" >
                <img component={Link} to="/" src={projectText} alt="icon" height="70px" />
                <Image src={projects} alt="icon" height="55px" />
            </LogoContainer>

            <MyToolBar>
                {user ? (
                    <Profile>
                        {
                            src ? <Avatar color="primary" alt={user.displayName || user.name} src={src} /> :
                                <Avatar color="primary" alt={user.displayName || user.name} src={src} >{user.name[0].toUpperCase()}</Avatar>
                        }
                        <UserName variant="h6">{user.displayName || user.name}</UserName>
                        <form>
                            <MyButton variant="contained" color="secondary" onClick={(e) => signout(e)}>
                                Logout
                            </MyButton>
                        </form>
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

const mapStateToProps = state => ({
    user: state.userData.user,
    message: state.userData.message
// Replace 'yourReducer' with the actual name of your reducer
});

const mapDispatchToProps = dispatch => ({
    getUser: () => dispatch(getUser()), // Replace with your actual action creator
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
