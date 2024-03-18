import React, { useState, useEffect } from 'react';
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
      const response = await fetch(`https://eventmanagement-backend-qcka.onrender.com/api/data`);
      const data = await response.json();
      console.log("Data: ", data);
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

      alert('Event Deleted successfully !!');
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
          <UpdateEvent eventData={selectedEvent} onCancelUpdate={handleCancelUpdate} />
        ) : (
          createEvent ? (
            <div>
              <EventCreationForm onCancleCreate={handleCancelCreate} />
            </div>
          ) : (
            <div>
              <section class="py-5 text-center container">
                <div class="row py-lg-5">
                  <div class="col-lg-6 col-md-8 mx-auto">
                    <h1 class="fw-light">All Events</h1>
                    <p class="lead text-body-secondary">Step into an expansive universe of experiences! Our home is where extraordinary events converge, inviting you to immerse yourself in a kaleidoscope of inspiration, learning, and unforgettable moments.</p>
                    <p>
                      <a href="#" class="btn btn-primary my-2" onClick={handleCreateClick}>Create New Event</a>
                    </p>

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
                  </div>
                </div>
              </section>

              <div class="album py-5 bg-body-tertiary">
                <div class="container">
                  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {events?.map((ele) => (
                      <div class="col">
                        <div class="card shadow-sm">
                          <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Image</text></svg>
                          <div class="card-body">
                            <h5 class="card-title">{ele[1]}</h5>
                            <p class="card-text">{ele[5]}</p>
                            <p class="card-text">Start Time: {ele[2]}</p>
                            <p class="card-text">End Time: {ele[3]}</p>
                            <p class="card-text">Location: {ele[4]}</p>
                            <div class="d-flex justify-content-between align-items-center">
                              <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary" onClick={() => handleUpdateClick(ele)}>Edit</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary" onClick={() => handleDeleteEvent(ele[0])}>Delete</button>
                              </div>
                              <small class="text-body-secondary">{ele[6]}</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )

        ))}
    </div>
  )


};

export default EventList;
