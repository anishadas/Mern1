import { Card, CardMedia, Typography, CardActions, styled, Button } from "@mui/material";

export const MyCard = styled(Card)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
    width:'90%'
})

export const MyCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
})

export const MyTypography = styled(Typography)({
    padding: '0 16px',
})

export const MyCardActions = styled(CardActions)({
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
})

export const Overlay = styled('div')({
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
})

export const Overlay2 = styled('div')({
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
})

export const Details = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
})

export const MyButton = styled('button')({
    height: '40px',
    width: "40px",
    borderRadius: "50%",
    backgroundColor: "white",
    border: "none",
    boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
    cursor: 'pointer',
    transition:'all 0.4s ease-in-out',
    '&: hover': {
        // boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        backgroundColor: "#9C27B0",
        color: 'white'
    },
})

export const MyButtons = styled(Button)({
    // boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
    cursor: 'pointer',
    transition: 'all 0.4s ease-in-out',
    '&: hover': {
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        backgroundColor: "#9C27B0",
        color: 'white',
    },
})

export const MyButton2 = styled(Button)({
    position: 'relative',
    left: '187px',
    bottom:'25px'
})
