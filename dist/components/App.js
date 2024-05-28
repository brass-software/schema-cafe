import React from 'react';
export default function App(props) {
    return React.createElement("main", null,
        React.createElement("div", null, props.path));
}
