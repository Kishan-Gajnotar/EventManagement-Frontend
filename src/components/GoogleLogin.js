import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { FaGoogle } from 'react-icons/fa'; 

const clientId = '518685472049-v6tuegmek7ec7j0c683atrm59r0pneri.apps.googleusercontent.com';

const GoogleLoginComponent = () => {
    const onSuccess = (response) => {
        alert('Login Successful !');
        console.log('Login successful:', response);
    };

    const onFailure = (error) => {
        alert('Login failed !');
        console.error('Login failed:', error);
    };

    return (
        <div>
            <h1>Event Management</h1>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy="single_host_origin" 
                render={(renderProps) => (
                    <button type="button" onClick={renderProps.onClick} className="google-login-btn">
                        <FaGoogle size={24} /> Sign in with Google
                    </button>
                )}
            />
        </div>
    );
};

export default GoogleLoginComponent;