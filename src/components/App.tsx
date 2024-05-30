import React from 'react';
import Login from './Login';
import parsePath from '../functions/parsePath';
import joinPath from '../functions/joinPath';
import Schema from './Schema';

export default function App(props: { path: string }) {
    const authenticated = typeof localStorage !== "undefined" ? localStorage.getItem("session") : false;
    if (!authenticated) {
        return <Login />
    }
    const session = JSON.parse(localStorage.getItem('session'));
    const path = parsePath(props.path);
    if (path.length === 0) {
        return <main><a href={"/"+session.UserID}>My Schemas</a></main>
    }
    return <Schema id={joinPath(path)} />
}
