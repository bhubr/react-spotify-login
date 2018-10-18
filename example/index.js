import React from 'react';
import ReactDOM from 'react-dom';
import SpotifyLogin from '../src/SpotifyLogin';

const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);

ReactDOM.render(
  <SpotifyLogin clientId=""
    redirectUri=""
    onSuccess={onSuccess}
    onFailure={onFailure}/>,
  document.getElementById('example')
);
