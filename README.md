# React Spotify Login

React component for [Spotify Implicit Grant Workflow login](https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow) and [Spotify Authorization Code Flow login](https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow).

## Credits

First of all: I (Benoît Hubert) am not really (or really not) the author of this component. It is indeed based on [React GitHub Login](https://github.com/checkr/react-github-login) from [Checkr](https://checkr.com/).

All credits go to [Kurt Ruppel](https://github.com/kruppel) (main author) and [Stewart Park](https://github.com/stewartpark) (contributor).

I used the original component to help students build a project based on GitHub's API, and needed something similar to help another student build a project based on Spotify's API.

## Usage

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import SpotifyLogin from 'react-spotify-login';
import { clientId, redirectUri } from './settings';

const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);

ReactDOM.render(
  <SpotifyLogin clientId={clientId}
    responseType={responseType}
    redirectUri={redirectUri}
    onSuccess={onSuccess}
    onFailure={onFailure}/>,
  document.getElementById('example')
);
```

Settings file example:

```
// settings.js
export const clientId = 'ac56fad434a3a3c1561e';
export const redirectUri = 'http://localhost:3000';
```

### Props

#### `clientId`

`{string}` _required_

Client ID for Spotify OAuth application.

### `responseType`

`{string}` _required_

Authentication response type. Allowed values: `token` or `code`.

#### `redirectUri`

`{string}`

Registered redirect URI for Spotify OAuth application.

#### `scope`

`{string}`

Scopes for Spotify OAuth application (coma separated). Defaults to `user-read-private`.

#### `className`

`{string}`

CSS class for the login button.

#### `button`

`{string}` or `{node}`

Content for the login button.

#### `onRequest`

`{function}`

Callback for every request.

#### `onSuccess`

`{function}`

Callback for successful login. An object will be passed as an argument to the callback, e.g. `{ "access_token": "..." }` or `{ "code": "..." }`.

#### `onFailure`

`{function}`

Callback for errors raised during login.


## Development

```sh
$ npm start
```

Webpack development server starts at [http://localhost:8080](http://localhost:8080), loading [example/index.html](https://github.com/bhubr/react-spotify-login/tree/master/example/index.html).
