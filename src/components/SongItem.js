//SongItem.js
import React, {useState} from 'react';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DeleteModal from './DeleteModal';
import {deleteSong} from '../services/api/songApi';

const COVER_IMAGE_URL = process.env.REACT_APP_COVER_IMAGE_URL;

export const Item = ({
  artistName,
  title,
  albumTitle,
  albumCover,
  album,
  _id,
  onDelete,
}) => {
  const coverUrl = `${COVER_IMAGE_URL}/${albumCover}`;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteSong(_id);

      console.log('Song deleted successfully!');
      onDelete();
      handleCloseDeleteModal();
      // Optionally, you can refetch the songs after deletion
    } catch (error) {
      console.error('Error deleting song:', error);
      // Handle error, show alert, etc.
    }
  };

  return (
    <>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <React.Fragment>
            <IconButton edge="end" aria-label="create" style={{margin: 2}}>
              <CreateIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={handleOpenDeleteModal}>
              <DeleteIcon />
            </IconButton>
          </React.Fragment>
        }>
        <img
          src={coverUrl}
          alt={`${artistName} - ${title}`}
          style={{width: 64, height: 64, marginRight: 16}}
        />
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Box sx={{ml: 1.5, minWidth: 0}}>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}>
              {artistName}
            </Typography>
            <Typography noWrap>
              <b>{title}</b>
            </Typography>
            <Typography noWrap letterSpacing={-0.25}>
              {albumTitle}
            </Typography>
          </Box>
        </Box>
      </ListItem>
      <DeleteModal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirmDelete={handleConfirmDelete}
      />
    </>
  );
};
