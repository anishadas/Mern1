import { Button,styled,Typography } from "@mui/material"
import { Link } from "react-router-dom"



export const Heading = styled(Typography)({
    // color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
    // border:"2px solid green",
})

export const Image = styled('img')({
    marginLeft: '10px',
    marginTop: '5px',
})

export const LogoContainer = styled(Link)({
    display: 'flex',
    alignItems: 'center',
})



export const UserName = styled(Typography)({
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    padding:"0 15px",
    fontFamily: 'Bebas Neue',
    // color: '#5DB8FE',
    fontSize: '1.5rem',
})


export const MyButton = styled(Button)({
    color: "white",
    height:'fit-content'
})