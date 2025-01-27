import React, {useState, useEffect} from 'react';
import {Box, Button, Input, FormControl} from '@mui/material';
import YearPicker from './YearPicker';

const EditAlbumForm = ({album, onClose, onEdit}) => {
  const [formData, setFormData] = useState({
    title: album.title,
    date: album.date,
    albumCover: album.albumCover, // This will store the selected image file
  });

  const handleInputChange = (name, value) => {
    setFormData(prevData => ({...prevData, [name]: value}));
    console.log('formData:', formData);
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    setFormData(prevData => ({...prevData, albumCover: file}));
  };

  const handleSubmit = e => {
    e.preventDefault();
    try {
      onEdit(formData);
    } catch (error) {
      console.error('Error editing album:', error);
    }
    onClose();
  };

  useEffect(() => {
    console.log('formData:', formData);
  }, [formData]);

  return (
    <Box
      component="form"
      sx={{display: 'flex', flexWrap: 'wrap'}}
      onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={e => handleInputChange('title', e.target.value)}
        />
      </FormControl>
      <br />

      <YearPicker
        selectedYear={parseInt(formData.date, 10) || new Date().getFullYear()}
        onYearChange={year => handleInputChange('date', year)}
      />
      <br />

      <FormControl fullWidth>
        <Input
          id="albumCover"
          name="albumCover"
          type="file"
          onChange={handleImageChange}
        />
      </FormControl>
      <br />

      <Button type="submit" variant="contained" color="primary">
        Edit Album
      </Button>
    </Box>
  );
};

export default EditAlbumForm;
