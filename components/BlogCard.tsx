import * as React from 'react';
import CardMedia from '@mui/material/CardMedia';

import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
// import { Clock as ClockIcon } from '../../icons/clock';
// import { Download as DownloadIcon } from '../../icons/download';


interface BlogCardProps {
    title: string,
    markdown: string
}

export default function BlogCard({title, markdown}: BlogCardProps) {
  return (
    // <Card sx={{ maxWidth: 345 }}>
    //   <CardActionArea>
    //     <CardMedia
    //       component="img"
    //       height="140"
    //       image="/static/images/cards/contemplative-reptile.jpg"
    //       alt="green iguana"
    //     />
    //     <CardContent>
    //       <Typography gutterBottom variant="h5" component="div">
    //         {title}
    //       </Typography>
    //       <Typography variant="body2" color="text.secondary">
    //         Lizards are a widespread group of squamate reptiles, with over 6,000
    //         species, ranging across all continents except Antarctica
    //       </Typography>
    //     </CardContent>
    //   </CardActionArea>
    // </Card>


    <Card
        sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            px: 0,
            mx: 0
        }}
    >
        <CardContent>
        <Box
            sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 0
            }}
        >
        </Box>
        <CardMedia
          component="img"
          height="200"
          image="https://picsum.photos/300/300"
          alt="green iguana"
        />
        <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h5"
        >
            {title}
        </Typography>
        <Typography
            align="center"
            color="textPrimary"
            variant="body1"
        >
            {markdown}
        </Typography>
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <Box sx={{ p: 2 }}>
        <Grid
            container
            spacing={2}
            sx={{ justifyContent: 'space-between' }}
        >
            <Grid
            item
            sx={{
                alignItems: 'center',
                display: 'flex'
            }}
            >
            {/* <ClockIcon color="action" /> */}
            <Typography
                color="textSecondary"
                display="inline"
                sx={{ pl: 1 }}
                variant="body2"
            >
                Updated 2hr ago
            </Typography>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          {/* <DownloadIcon color="action" /> */}
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            {10}
            {' '}
            Downloads
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
  );
}