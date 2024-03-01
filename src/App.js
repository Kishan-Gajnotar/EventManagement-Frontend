import React, { useEffect, useState } from 'react';
import EventList from './components/EventList';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { jwtDecode } from "jwt-decode";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [googleScriptError, setGoogleScriptError] = useState(false);

  useEffect(() => {
    const initializeGoogleSignIn = async () => {
      try {
        /*global google */
        // const googleScript = await import('https://accounts.google.com/gsi/client');
        // Initialize Google Sign-In
        google.accounts.id.initialize({
          client_id: '518685472049-v6tuegmek7ec7j0c683atrm59r0pneri.apps.googleusercontent.com',
          callback: handleCallbackResp
        });

        // Render the sign-in button
        google.accounts.id.renderButton(
          document.getElementById("signInDiv"),
          { theme: 'outline', size: 'large' }
        );
      } catch (error) {
        console.error("Error loading Google API:", error);
        setGoogleScriptError(true);
      }
    };

    initializeGoogleSignIn();
  }, []);

  const handleCallbackResp = (resp) => {
    console.log("encoded JWT token", resp.credential);
    const userObject = jwtDecode(resp.credential, { header: true });
    console.log("userObject..", userObject);
    alert('Login successfull !');
    setIsSignedIn(true);
    document.getElementById("signInDiv").hidden = true;
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    document.getElementById("signInDiv").hidden = false;
    setGoogleScriptError(false); // Reset error state
  };

  return (
    <div className='App'>
      {
        !isSignedIn &&
        <h1 className="welcome-text">Welcome to the Event Management Project</h1>
      }
      <div id="signInDiv"></div>
      {isSignedIn ? (
        <div>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" color="error" onClick={handleSignOut}>
              Sign Out
            </Button>
          </Stack>
          <EventList />
        </div>
      ) : null}
      {googleScriptError && <p>Error loading Google API. Please check your network connection and try again.</p>}
    </div>
  );
};

export default App;
