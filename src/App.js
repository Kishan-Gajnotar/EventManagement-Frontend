import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import EventList from './components/EventList';
import EventCreationForm from './components/EventCreationForm';
import Login from './components/Login'

const App = () => {
  return (
    <Router>
      <Routes> {/* Use Routes instead of directly placing Route */}
        <Route path="/" element={<EventList />} /> {/* Use the 'element' prop */}
        <Route path="/events" element={<EventList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-event" element={<EventCreationForm />} />
      </Routes>
    </Router>
  );
};

export default App;
