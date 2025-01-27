import React, {useEffect, useState} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import {DraggableItemsList} from '../DraggableAlbumList ';
import {fetchAlbums} from '../../services/api/albumApi';
import SearchBar from '../SearchBar';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlbumsTab = () => {
  const [albums, setAlbums] = React.useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [deleted, setDeleted] = useState(false);
  const [edited, setEdited] = useState(false);

  const handleDragEnd = result => {
    if (!result.destination) {
      return; // L'élément n'a pas été déplacé vers une nouvelle position
    }

    const newAlbums = Array.from(albums);
    const [movedAlbum] = newAlbums.splice(result.source.index, 1);
    newAlbums.splice(result.destination.index, 0, movedAlbum);

    setAlbums(newAlbums);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setDeleted(false);
  };

  const handleDelete = async () => {
    try {
      const updatedAlbums = await fetchAlbums();
      setAlbums(updatedAlbums);
      setDeleted(true);
    } catch (error) {
      console.error('Error fetching updated songs:', error);
    }
  };

  const handleEdit = async () => {
    try {
      const updatedAlbums = await fetchAlbums();
      setAlbums(updatedAlbums);
      setEdited(true);
    } catch (error) {
      console.error('Error fetching updated songs:', error);
    }
  };

  const handleSearch = (results, query) => {
    setCurrentPage(1);
    setFilteredAlbums(results);
  };

  useEffect(() => {
    // Fetch songs when the component mounts
    const fetchData = async () => {
      try {
        const albumsData = await fetchAlbums();
        setAlbums(albumsData);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Albums</h2>
      <div>
        <SearchBar data={albums} onSearch={handleSearch} />
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <DraggableItemsList
          items={filteredAlbums.length > 0 ? filteredAlbums : albums}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </DragDropContext>
      <Snackbar
        open={deleted}
        autoHideDuration={6000}
        onClose={handleAlertClose}>
        <Alert
          onClose={handleAlertClose}
          severity="success"
          sx={{width: '100%'}}>
          Album deleted successfully.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AlbumsTab;
