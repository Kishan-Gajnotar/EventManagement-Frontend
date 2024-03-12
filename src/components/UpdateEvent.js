import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const UpdateEvent = ({ eventData, onCancelUpdate }) => {
    const [showUpdateEvent, setShowUpdateEvent] = useState(true);
    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const formattedDate = date.toISOString().slice(0, 16); // Format: "YYYY-MM-DDTHH:MM"
        return formattedDate;
    };

    // Initialize state with eventData
    const [updatedEventData, setUpdatedEventData] = useState({
        name: eventData[1],
        startTime: formatDate(eventData[2]), // Format start time
        endTime: formatDate(eventData[3]), // Format end time
        location: eventData[4],
        description: eventData[5],
        category: eventData[6],
        bannerImage: eventData[7]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedEventData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://eventmanagement-backend-qcka.onrender.com/api/events/update/${eventData[0]}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: updatedEventData.name,
                    starttime: updatedEventData.startTime,
                    endtime: updatedEventData.endTime,
                    location: updatedEventData.location,
                    description: updatedEventData.description,
                    category: updatedEventData.category,
                    bannerImage: updatedEventData.bannerImage
                })
            });
            if (!response.ok) {
                throw new Error('Failed to update event: ' + response.status);
            }

            alert('Event updated successfully!');
            onCancelUpdate();
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    return (
        <div>
            <h2>Update Event</h2>
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
                    value={updatedEventData.name}
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="datetime-filter"
                    label="Start Time"
                    name="startTime"
                    type="datetime-local"
                    value={updatedEventData.startTime}
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
                    value={updatedEventData.endTime}
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
                    value={updatedEventData.location}
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Description"
                    name="description"
                    value={updatedEventData.description}
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Category"
                    name="category"
                    value={updatedEventData.category}
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="BannerImageURL"
                    name="bannerImage"
                    value={updatedEventData.bannerImage}
                    onChange={handleChange}
                />
            </Box>
            <Button variant="contained" type="submit" onClick={handleUpdate}>Update</Button>
        </div>
    );
};

export default UpdateEvent;
