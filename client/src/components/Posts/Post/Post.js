import React from 'react'
import { Typography, Button, CardContent, Link } from '@mui/material';
import { MyCard, MyCardActions, MyCardMedia, MyTypography, Overlay, Overlay2, Details } from './styles'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LaunchIcon from '@mui/icons-material/Launch';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
function Post({ post, setCurrentId }) {

    const dispatch = useDispatch();
    return (
        <MyCard>
            <MyCardMedia image={post?.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} />
            <Overlay>
                {/* <Typography variant="h6">{post.creator}</Typography> */}
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </Overlay>
            <Overlay2>
                <Button style={{ color: 'white' }} size="small" onClick={()=>setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </Overlay2>
            <Details>
                <Typography variant="body2" color="textSecondary" component="h2">
                    <Link href={post.hostingAt} underline="hover">
                        <LaunchIcon />
                    </Link>
                </Typography>
            </Details>
            <MyTypography variant='h5' gutterBottom>{post.title}</MyTypography>
            <CardContent>
                <Typography variant="body2" color='textSecondary' component='p'>{post.message}</Typography>
            </CardContent>
            <MyCardActions>
                <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
                    <ThumbUpAltIcon fontSize="small" />
                    &nbsp;Like &nbsp;
                    {post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
            </MyCardActions>
        </MyCard>
    )
}

export default Post
