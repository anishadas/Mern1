import React, { useState } from 'react'
import { Typography, CardContent, Link, ButtonBase } from '@mui/material';
import { MyCard, MyCardActions, MyCardMedia, MyTypography, Overlay, Overlay2, Details, MyButton, MyButtons, MyTech } from './styles'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, getPosts, likePost } from '../../../actions/posts';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
// import { useNavigate } from 'react-router-dom'


function Post({ post, setCurrentId, index }) {


    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('profile'));
    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpOffAltIcon fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }
        return <><ThumbUpOffAltIcon fontSize="small" />&nbsp;Like</>;
    }
    // const openPost = (e) => {

    //     navigate(`/posts/${post._id}`)
    // }

    return (
        <MyCard raised elevation={6}>
            {/* <MyButtonBase
                component="span"
                name="test"
                onClick={openPost}
            > */}
            <MyCardMedia image={post?.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} />
            <Overlay>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </Overlay>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <Overlay2>
                    <MyButton onClick={() => setCurrentId(post._id)}>
                        <EditIcon />
                    </MyButton>
                </Overlay2>
            )}
            <Details>
                <Link href={post.hostingAt} underline="hover" target="_blank" style={{ display: "flex" }}>
                    <Typography variant="h6" gutterBottom >
                        hostingAt
                    </Typography>
                    <LaunchIcon style={{ marginTop: "4px", marginLeft: "2px" }} />
                </Link>
            </Details>
            <MyTypography variant='h5' gutterBottom>{post.title}</MyTypography>

            <CardContent style={{ paddingBottom: '5px', paddingTop: '5px' }}>
                <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
            </CardContent>

            <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
                <Typography variant="subtitle2" gutterBottom>Techs: </Typography>
                <Typography variant="body1" color="primary" gutterBottom style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", alignItems: "center" }}>
                    {post.techs.map(tech => <MyTech>{tech}</MyTech>)}
                </Typography>
            </CardContent>

            {/* </MyButtonBase> */}
            <MyCardActions >
                <MyButtons size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </MyButtons>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <MyButtons size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </MyButtons>
                )}
            </MyCardActions>

        </MyCard>
    )
}

export default Post
