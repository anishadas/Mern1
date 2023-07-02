import { AppBar,Button,styled,Toolbar,Typography } from "@mui/material"
// const theme = createTheme();

export const MyAppBar = styled(AppBar)({
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2px 50px',
})

export const Heading = styled(Typography)({
    color: 'rgba(0,183,255, 1)',
})

export const Image = styled('img')({
    marginLeft: '15px',
})

export const LogoContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
})

export const MyToolBar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'flex-end',
    width: '300px',
})

export const Profile = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '300px',
})

export const UserName = styled(Typography)({
    display: 'flex',
    alignItems: 'center',
    fontFamily:'Bebas Neue',
    color: '#5DB8FE',
    fontSize:'28px'
})


export const MyButton = styled(Button)({
    color:"white"
})