import { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// to extract user info of login & use it across our application (eg. display username in header)
export const JwtContext = createContext();

export const JwtContextProvider = ({ children }) => {
  const [jwtToken, setJwtToken] = useState('');

  const [tickingInterval, setTickingInterval] = useState();

  const navigate = useNavigate();

  const invokeRefreshToken = useCallback(
    (status) => {
      console.log('Invoke Refresh Token');
      if (status) {
        let id = setInterval(() => {
          console.log('Fetch refresh token every 10 minutes');
          axios
            .get('/refreshToken')
            .then(({ data }) => {
              console.log('refresh token: ', data);
              if (data) {
                setJwtToken(data.access_token);
                invokeRefreshToken(true);
              }
            })
            .catch((err) => {
              alert('Login again message from jwt context');
              navigate('/login');
            });
        }, 600000);
        setTickingInterval(id);
      } else {
        console.log('Turning OFF Ticking: ', tickingInterval);
        setTickingInterval(null);
        clearInterval(tickingInterval);
      }
    },
    [tickingInterval]
  );

  // since we are setting context on login page only, which redirects to main page on success,
  // so our context is lost on other page if we reload, hence we need to keep track of login status using cookie
  useEffect(() => {
    if (jwtToken === '') {
      axios
        .get('/refreshToken')
        .then(({ data }) => {
          console.log('refresh token: ', data);
          if (data) {
            setJwtToken(data.access_token);
            invokeRefreshToken(true);
          }
        })
        .catch((err) => {
          alert('Login again message from jwt context');
          navigate('/login');
        });
    }
  }, [jwtToken, navigate, invokeRefreshToken]);

  return (
    <JwtContext.Provider value={{ jwtToken, setJwtToken, invokeRefreshToken }}>
      {children}
    </JwtContext.Provider>
  );
};
