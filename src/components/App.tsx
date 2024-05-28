import React from 'react';
import Login from './Login';

export default function App(props: { path: string }) {
    const authenticated = typeof localStorage !== "undefined" ? localStorage.getItem("session") : false;
    if (!authenticated) {
        return <Login />
    }
    return <main><div>{props.path}</div></main>
}
