import React, { useEffect, useState } from 'react'
import Form from '../form/Form'
import { Container, Grid,Grow } from '@mui/material';
import {  MyGrid } from './styles';
import Posts from '../Posts/Posts';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch, currentId])
    
    return (
        <Grow in> 
            <Container>
                <MyGrid container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form setCurrentId={setCurrentId} currentId={currentId} />
                    </Grid>
                </MyGrid>
            </Container>
        </Grow>
    )
}

export default Home
