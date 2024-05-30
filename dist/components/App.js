import React from 'react';
import Login from './Login';
import parsePath from '../functions/parsePath';
import joinPath from '../functions/joinPath';
import Schema from './Schema';
export default function App(props) {
    const authenticated = typeof localStorage !== "undefined" ? localStorage.getItem("session") : false;
    if (!authenticated) {
        return React.createElement(Login, null);
    }
    const session = JSON.parse(localStorage.getItem('session'));
    const path = parsePath(props.path);
    if (path.length === 0) {
        return React.createElement("main", null,
            React.createElement("a", { href: "/" + session.UserID }, "My Schemas"));
    }
    return React.createElement(Schema, { id: joinPath(path) });
}
