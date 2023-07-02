import * as React from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Modal, Fade, Backdrop } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({handleClose,open,post}) {
  

  return (
    <div>
          <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                  backdrop: {
                      timeout: 500,
                  },
              }}
          >
              <Fade in={open}>
                  <Box sx={style}>
                      <Typography id="transition-modal-title" variant="h6" component="h2">
                          {post.title}
                      </Typography>
                      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                          {post.message}
                      </Typography>
                  </Box>
              </Fade>
          </Modal>
    </div>
  );
}
