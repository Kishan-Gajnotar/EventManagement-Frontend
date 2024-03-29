// EventCreationForm.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const EventCreationForm = ({ onCancleCreate }) => {
  const [eventData, setEventData] = useState({
    name: '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
    category: '',
    bannerImage: ''
  });

  const isEventDataEmpty = Object.values(eventData).some(value => value === '');

  // console.log("Event Data: ", eventData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://eventmanagement-backend-qcka.onrender.com/api/create/event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: eventData.name,
          starttime: eventData.startTime,
          endtime: eventData.endTime,
          location: eventData.location,
          description: eventData.description,
          category: eventData.category,
          bannerImage: eventData.bannerImage
        })
      });
      // console.log("Response: ", response);
      if (!response.ok) {
        const errorMessage = await response.text(); // Extract error message from response
        alert('Failed to Create Event: ' + errorMessage);
        return;
      }

      alert('Event Created Successfully !!');
      setEventData({
        name: '',
        startTime: '',
        endTime: '',
        location: '',
        description: '',
        category: '',
        bannerImage: ''
      });
      onCancleCreate();


    } catch (error) {
      console.error('Error Creating Event:', error);
    }
  };

  return (
    <div>
      <section class="py-5 text-center container">
        <div class="row lg-3" style={{ paddingTop: '20px', paddingBottom: '25px' }}>
          <h1 class="fw-light" style={{ marginBottom: '30px' }}>Create Event</h1>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >

            <TextField
              required
              id="outlined-required"
              label="Title"
              name="name"
              value={eventData.name}
              onChange={handleChange}
            />
            <TextField
              required
              id="datetime-filter"
              label="Start Time"
              name="startTime"
              type="datetime-local"
              value={eventData.startTime}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ m: 1 }}
            />
            <TextField
              required
              id="datetime-filter"
              label="End Time"
              name="endTime"
              type="datetime-local"
              value={eventData.endTime}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ m: 1 }}
            />
            <TextField
              required
              id="outlined-required"
              label="Location"
              name="location"
              value={eventData.location}
              onChange={handleChange}
            />
            <TextField
              required
              id="outlined-required"
              label="Description"
              name="description"
              value={eventData.description}
              onChange={handleChange}
            />
            <TextField
              required
              id="outlined-required"
              label="Category"
              name="category"
              value={eventData.category}
              onChange={handleChange}
            />
            <TextField
              required
              id="outlined-required"
              label="BannerImageURL"
              name="bannerImage"
              value={eventData.bannerImage}
              onChange={handleChange}
            />
          </Box>
        </div>
        <Button variant="contained" type="submit" onClick={handleSubmit} disabled={isEventDataEmpty} style={{ padding: '10px 20px', marginRight: '10px' }}>Submit</Button>
        <Button variant="contained" type="submit" onClick={onCancleCreate} style={{ padding: '10px 20px' }}>Cancle</Button>
      </section>
    </div>
  );
};

export default EventCreationForm;
