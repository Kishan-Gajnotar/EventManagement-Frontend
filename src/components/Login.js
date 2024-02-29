import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';

const Login = () => {
  const [showPopup, setShowPopup] = useState(false);

  const responseGoogle = (response) => {
    console.log(response);
    if (response && response.profileObj) {
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <GoogleLogin
        clientId="518685472049-v6tuegmek7ec7j0c683atrm59r0pneri.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <button onClick={closePopup}>Close</button>
            <p>Welcome! You have successfully logged in.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
