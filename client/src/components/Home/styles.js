import {  AppBar, Grid, Paper, styled } from '@mui/material'
// const theme = useTheme();

    
// [theme.breakpoints.down('sm')]:(add it)
export const MyPaper = styled(Paper)({
    // border: '2px solid red',
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
    
})

export const AppBarSearch = styled(AppBar)({
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
    // border:"2px solid red"
})

