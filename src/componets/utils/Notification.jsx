import { Box, Grid } from '@mui/material'
import React from 'react'
import NotificationTop from './Notification/NotificationTop'
import NotificationBottom from './Notification/NotificationBottom'
import NotificationMiddle from './Notification/NotificationMiddle'

function Notification() {
  return (
    <Box>

      <Grid container display={"flex"} justifyContent={"center"}>
        <Grid item md={8} sm={12} padding={1}>
          <NotificationTop />
          <NotificationMiddle />
          <NotificationBottom />
        </Grid>
      </Grid>

    </Box>
  )
}

export default Notification
