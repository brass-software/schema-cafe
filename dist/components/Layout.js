import React from 'react';
export default function Layout({ children, }) {
    return (React.createElement("html", { lang: "en" },
        React.createElement("body", { className: "" }, children)));
}
