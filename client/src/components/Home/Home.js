import React, { useEffect, useState } from 'react'
import Form from '../form/Form'
import projects from '../../images/projects.png'
import { Container, Grid } from '@mui/material';
import { MyAppBar, Heading, Image,MyGrid } from './styles';
import Posts from '../Posts/Posts';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch, currentId])
    
    return (
        <Container maxWidth="lg">
            <MyAppBar position="static" color="inherit">
                <Heading variant="h2" align="center">Memories</Heading>
                <Image src={projects} alt="icon" height="60" />
            </MyAppBar>
            {/* <Grow in> */}
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
            {/* </Grow> */}
        </Container>
    )
}

export default Home
