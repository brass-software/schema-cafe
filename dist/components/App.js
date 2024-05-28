import React from 'react';
import Login from './Login';
export default function App(props) {
    const authenticated = typeof localStorage !== "undefined" ? localStorage.getItem("session") : false;
    if (!authenticated) {
        return React.createElement(Login, null);
    }
    return React.createElement("main", null,
        React.createElement("div", null, props.path));
}
