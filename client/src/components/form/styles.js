import { Paper, Button,styled ,createTheme} from '@mui/material'
// import createTheme from '@mui/material'
const theme = createTheme();

export const MyPaper = styled(Paper)({
    padding: theme.spacing(2)
})

export const MyForm = styled('form')({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
    },
})

export const FileInput = styled('div')({
    width: '97%',
    margin: '10px 0',
})

export const MyButton = styled(Button)({
    marginBottom: 10,
})