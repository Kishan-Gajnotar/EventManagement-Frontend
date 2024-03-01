import React, { useEffect, useState } from 'react';
import EventList from './components/EventList';
import { jwtDecode } from "jwt-decode";

const App = () => {
  const [user, setUser] = useState({});
  const [isSignedIn, setIsSignedIn] = useState({});
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
  }, [user]);

  const handleCallbackResp = (resp) => {
    console.log("encoded JWT token", resp.credential);
    const userObject = jwtDecode(resp.credential, { header: true });
    console.log("userObject..", userObject);
    setUser(userObject);
    setIsSignedIn(true);
    document.getElementById("signInDiv").hidden = true;
  };

  const handleSignOut = () => {
    setUser({});
    setIsSignedIn(false);
    document.getElementById("signInDiv").hidden = false;
    setGoogleScriptError(false); // Reset error state
  };

  return (
    <div className='App'>
      <div id="signInDiv"></div>
      {isSignedIn && (
        <div>
          <button onClick={handleSignOut}>Sign Out</button>
          <EventList />
        </div>
      )}
      {googleScriptError && <p>Error loading Google API. Please check your network connection and try again.</p>}
    </div>
  );
};

export default App;
