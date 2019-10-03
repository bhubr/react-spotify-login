import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PopupWindow from './PopupWindow';
import { toQuery } from './utils';

class SpotifyLogin extends Component {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        clientId: PropTypes.string.isRequired,
        onRequest: PropTypes.func,
        onSuccess: PropTypes.func,
        onFailure: PropTypes.func,
        redirectUri: PropTypes.string.isRequired,
        scope: PropTypes.string,
    }

    static defaultProps = {
        buttonText: 'Sign in with Spotify',
        scope: 'user-read-private',
        onRequest: () => { },
        onSuccess: () => { },
        onFailure: () => { },
    }

    onBtnClick = () => {
        const { clientId, scope, redirectUri, responseType } = this.props;
        const search = toQuery({
            client_id: clientId,
            scope,
            redirect_uri: redirectUri,
            response_type: responseType
        });

        const popup = this.popup = PopupWindow.open(
            responseType,
            'spotify-authorization',
            `https://accounts.spotify.com/authorize?${search}`,
            { height: 1000, width: 600 }
        );

        this.onRequest();

        popup.then(
            data => this.onSuccess(data),
            error => this.onFailure(error)
        );
    }

    onRequest = () => {
        this.props.onRequest();
    }

    onSuccess = (data) => {
        console.log("Success data: ", data)
        if (this.props.response_type === "token" && !data.access_token) {
            return this.onFailure(new Error('\'access_token\' not found'));
        }

        if (this.props.response_type === "code" && !data.code) {
            return this.onFailure(new Error('\'code\' not found'));
        }

        this.props.onSuccess(data);
    }

    onFailure = (error) => {
        this.props.onFailure(error);
    }

    render() {
        const { className, button, children } = this.props;
        const attrs = { onClick: this.onBtnClick };

        if (className) {
            attrs.className = className;
        }

        return <button {...attrs}>{children || button}</button>;
    }
}

export default SpotifyLogin;