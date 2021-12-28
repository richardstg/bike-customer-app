import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";

const Auth = (props) => {
  const { login } = props;
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [success, setSuccess] = useState();

  const responseGoogleSuccess = async (response) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Authorization: "Bearer " + context.token,
        },
        body: JSON.stringify({ tokenId: response.tokenId }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }
      setSuccess(true);
      setLoading(false);
      login(data.userId, data.userEmail, data.token);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  const responseGoogleError = (response) => {
    // console.log(response);
    setError(response.message);
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Logga in"
      onSuccess={responseGoogleSuccess}
      onFailure={responseGoogleError}
      cookiePolicy={"single_host_origin"}
      isSignedIn={false}
    />
  );
};

export default Auth;
