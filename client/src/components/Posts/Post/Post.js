import React, { useState } from 'react'
import { Typography, CardContent, Link, Button } from '@mui/material';
import { MyCard, MyCardActions, MyCardMedia, MyTypography, Overlay, Overlay2, Details, MyButton, MyButtons, MyButton2 } from './styles'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Modal from './Modal';


function Post({ post, setCurrentId }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
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
    
   
    return (
        <MyCard>
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
                    <Typography variant="h6" gutterBottom>
                        hostingAt
                    </Typography>
                    <LaunchIcon style={{ marginTop: "4px", marginLeft: "2px" }} />
                </Link>
            </Details>
            <MyTypography variant='h5' gutterBottom>{post.title}</MyTypography>
            <CardContent>
                {
                    post.message.length > 150 ? (
                        <div style={{ height: "83px" }}>
                            <Typography variant="body2" color='textSecondary' component='p'>{post.message.substring(0, 150)}</Typography>
                            <MyButton2 onClick={handleOpen}><MoreHorizIcon /></MyButton2>
                        </div>
                    ) : (
                        <Typography variant="body2" color='textSecondary' style={{ height: "83px" }} component='p'>{post.message}</Typography>)
                }

            </CardContent>
            <MyCardActions>
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
            <Modal handleOpen={handleOpen} handleClose={handleClose} open={open} post={post} />
        </MyCard>
    )
}

export default Post
