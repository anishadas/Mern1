import React, { useContext, useEffect, useState } from 'react'
import Form from '../form/Form'
import { AppBar, Container, Grid, Grow, Paper, useTheme, styled, Button, TextField } from '@mui/material';

import { MyPaper, AppBarSearch } from './styles';
import Posts from '../Posts/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/posts';
import MyPagination from '../MyPagination';
import SearchInput from './SearchInput';
import { connect } from 'react-redux';



const Home = ({ user,message}) => {

    const [currentId, setCurrentId] = useState(0);


    const dispatch = useDispatch();
    const theme = useTheme();

   
    const GridContainer = styled(Grid)({
        [theme.breakpoints.down('sm')]: {
            display: "flex",
            flexDirection: 'column-reverse',
        }
    })


    useEffect(() => {
        dispatch(getPosts());
        // alert("hi")
    }, [dispatch, currentId]);



    return (
        <Grow in style={{ marginTop: "150px" }}>
            <Container maxWidth="xl">
                <GridContainer container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <SearchInput />

                        <Form setCurrentId={setCurrentId} currentId={currentId} user={user} />
                        <MyPaper elevation={6}>
                            <MyPagination />
                        </MyPaper>
                    </Grid>
                </GridContainer>
            </Container>


        </Grow>
    )
}
const mapStateToProps = state => ({
    user: state.userData.user,
    message:state.userData.message
    // Replace 'yourReducer' with the actual name of your reducer
});

const mapDispatchToProps = dispatch => ({
    // fetchData: () => dispatch(fetchDataAction()), // Replace with your actual action creator
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
