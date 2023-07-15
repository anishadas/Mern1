import { AppBar, Button, TextField,createTheme, styled,useTheme } from '@mui/material'
import { MuiChipsInput } from 'mui-chips-input'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate,useLocation } from 'react-router';
import { getPostBySearch } from '../../actions/posts';

const theme = createTheme();

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

function SearchInput() {
    const [search, setSearch] = useState("");
    const [chips, setChips] = useState([]);

    const query = useQuery();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme1 = useTheme();

    const MyAppBar = styled(AppBar)({
        padding: theme.spacing(2),
        marginBottom: '10px',
        [theme1.breakpoints.down('sm')]: {
            marginTop:"50px"
        },
    })

    const page = query.get("page") || 1;
    const searchQuery = query.get("searchQuery")

    const handleAdd = (chip) => { setChips([...chips, chip]) }
    const handleDelete = (deleteChip) => { setChips(chips.filter(chip => chip !== deleteChip)) }

    const handleKeyPressChange = (e) => {
        // console.log("hi")
        if (e.keyCode === 13) {
            searchPost();
        }
    }


    const searchPost = () => {
        if (search.trim() || chips) {
            // console.log(search)
            // cannot send chips array
            dispatch(getPostBySearch({ search, techs: chips.join(",") }));
            navigate(`/posts/search?searchQuery=${search || 'none'}&techs=${chips.join(",") || 'none'}`)
        } else {
            navigate('/')
        }
    }
  return (
      <MyAppBar position='static' color='inherit'>
          <TextField
              label="search project"
              variant='outlined'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyPressChange}
          />


          <br />
          <MuiChipsInput
              value={chips}
              variant='outlined'
              onAddChip={handleAdd}
              onDeleteChip={handleDelete}
              label="search techs" />
          <br />
          <Button color='primary' variant="contained" onClick={searchPost}>Search</Button>
      </MyAppBar>
  )
}

export default SearchInput
