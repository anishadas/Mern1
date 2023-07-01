import { AppBar, Grid, Typography, styled,createTheme } from '@mui/material'
const theme = createTheme();
export const MyAppBar = styled(AppBar)({
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
})

export const Heading = styled(Typography)({
    color: 'rgba(0,183,255, 1)',
})

export const Image = styled('img')({
    marginLeft: '15px',
})
    
// [theme.breakpoints.down('sm')]:(add it)
export const MyGrid = styled(Grid)({
    flexDirection:'column-reverse'
})