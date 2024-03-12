import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import UpdateEvent from './UpdateEvent';
import EventCreationForm from './EventCreationForm'

const locations = [
  { value: '', label: 'All' },
  { value: 'Ahmedabad', label: 'Ahmedabad' },
  { value: 'Gandhinagar', label: 'Gandhinagar' },
  { value: 'Vadodara', label: 'Vadodara' },
];

const categories = [
  { value: '', label: 'All' },
  { value: 'Music', label: 'Music' },
  { value: 'Dance', label: 'Dance' },
  { value: 'Sports', label: 'Sports' },
];

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateTimeFilter, setDateTimeFilter] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [createEvent, setCreateEvent] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [locationFilter, categoryFilter, dateTimeFilter, selectedEvent, createEvent]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('https://eventmanagement-backend-qcka.onrender.com/api/data');
      const data = await response.json();
      console.log("data....", data)
      if (!response.ok) {
        throw new Error('Failed to Fetch Data: ' + response.status);
      }
      let filteredEvents = data;
      if (locationFilter) {
        filteredEvents = filteredEvents.filter(event => event[4] === locationFilter);
      }
      if (categoryFilter) {
        filteredEvents = filteredEvents.filter(event => event[6] === categoryFilter);
      }
      if (dateTimeFilter) {
        const dateTime = new Date(dateTimeFilter).getTime();
        filteredEvents = filteredEvents.filter(event => new Date(event[2]).getTime() <= dateTime && new Date(event[3]).getTime() >= dateTime);
      }
      setEvents(filteredEvents);
    } catch (error) {
      console.error('Error Fetching Events:', error);
      setError(error.message);
    }
  };

  const handleLocationChange = (event) => {
    setLocationFilter(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleDateTimeChange = (event) => {
    setDateTimeFilter(event.target.value);
  };

  const handleUpdateClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCancelUpdate = () => {
    setSelectedEvent(null);
  };
  const handleCreateClick = (event) => {
    setCreateEvent(true)
  };

  const handleCancelCreate = () => {
    setCreateEvent(false)
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      // Call your delete API with eventId
      await fetch(`https://eventmanagement-backend-qcka.onrender.com/api/events/delete/${eventId}`, {
        method: 'DELETE',
      });

      alert('Event Deleted successfully!');
      // Refresh events after deletion
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        selectedEvent ? (
          <div>
            <Button variant="contained" onClick={handleCancelUpdate}>Back to Event List</Button>
            <UpdateEvent eventData={selectedEvent} onCancelUpdate={handleCancelUpdate} />
          </div>

        ) : (
          <div>
            {createEvent ? (
              <div>
                <Button variant="contained" onClick={handleCancelCreate}>Back to Event List</Button>
                <EventCreationForm onCancleCreate={handleCancelCreate} />
              </div>
            ) : (
              <div>
                <h2>Event List</h2>
                <Button variant="contained" color="primary" onClick={handleCreateClick}>Create New Event</Button>
                <div>
                  {/* Location filter */}
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="location-filter-label">Location</InputLabel>
                    <Select
                      labelId="location-filter-label"
                      id="location-filter"
                      value={locationFilter}
                      onChange={handleLocationChange}
                    >
                      {locations.map((location) => (
                        <MenuItem key={location.value} value={location.value}>{location.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Category filter */}
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="category-filter-label">Category</InputLabel>
                    <Select
                      labelId="category-filter-label"
                      id="category-filter"
                      value={categoryFilter}
                      onChange={handleCategoryChange}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.value} value={category.value}>{category.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* DateTime filter */}
                  <TextField
                    id="datetime-filter"
                    label="Date Time"
                    type="datetime-local"
                    value={dateTimeFilter}
                    onChange={handleDateTimeChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{ m: 1 }}
                  />
                </div>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="center">Start Time</TableCell>
                        <TableCell align="center">End Time</TableCell>
                        <TableCell align="center">Location</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Category</TableCell>
                        <TableCell align="center">Banner</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* Table rows... */}
                      {events.map((event) => (
                        <TableRow
                          key={event[0]}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {event[1]}
                          </TableCell>
                          <TableCell align="center">{event[2]}</TableCell>
                          <TableCell align="center">{event[3]}</TableCell>
                          <TableCell align="center">{event[4]}</TableCell>
                          <TableCell align="center">{event[5]}</TableCell>
                          <TableCell align="center">{event[6]}</TableCell>
                          <TableCell align="center">{event[7]}</TableCell>
                          {/* Table cells... */}
                          <TableCell align="center">
                            <Button variant="contained" color="secondary" onClick={() => handleDeleteEvent(event[0])}>Delete</Button>
                            <Button variant="contained" color="primary" onClick={() => handleUpdateClick(event)}>Update</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )}
          </div>
        ))}
    </div>
  )


};

export default EventList;
