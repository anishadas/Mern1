import { Paper,styled ,createTheme, Avatar,Button} from "@mui/material"
const theme = createTheme();

export const MyPaper = styled(Paper)({
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
})

export const MyAvatar = styled(Avatar)({
    margin: theme.spacing(1),
})

export const MyForm = styled('form')({
    width: '100%',
    marginTop: theme.spacing(3),
})

export const SubmitButton = styled(Button)({
    marginTop: theme.spacing(2),
})



// root: {
//     '& .MuiTextField-root': {
//         margin: theme.spacing(1),
//     },
// },
// avatar: {
//         backgroundColor: theme.palette.secondary.main,
//   },


// googleButton: {
//     marginBottom: theme.spacing(2),
//   },