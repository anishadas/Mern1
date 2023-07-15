import React from 'react'
import { Pagination, PaginationItem } from '@mui/material'
import { Link } from 'react-router-dom'
function MyPagination() {
    return (
        <Pagination
            count={5}
            style={{ justifyContent: "space-around" }}
            page={1} variant='outlined'
            color='primary'
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
            )} />
    )
}

export default MyPagination

