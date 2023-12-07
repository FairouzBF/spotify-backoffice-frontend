import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';

const CoverImage = styled('div')({
  width: 100,
  height: 100,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.08)',
  '& > img': {
    width: '100%',
  },
});

// Item component
export const Item = ({artist, songTitle, albumTitle, imageSrc}) => (
  <ListItem
    alignItems="flex-start"
    secondaryAction={
      <React.Fragment>
        <IconButton edge="end" aria-label="create">
          <CreateIcon />
        </IconButton>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </React.Fragment>
    }>
    <Box sx={{display: 'flex', alignItems: 'center'}}>
      <CoverImage>
        <img alt="Song Title" src={imageSrc} />
      </CoverImage>
      <Box sx={{ml: 1.5, minWidth: 0}}>
        <Typography variant="caption" color="text.secondary" fontWeight={500}>
          {artist}
        </Typography>
        <Typography noWrap>
          <b>{songTitle}</b>
        </Typography>
        <Typography noWrap letterSpacing={-0.25}>
          {albumTitle}
        </Typography>
      </Box>
    </Box>
  </ListItem>
);
