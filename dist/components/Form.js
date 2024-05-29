import React, { useState } from "react";
import Button from "./Button";
export default function Form(props) {
    const [err, setErr] = useState('');
    const onError = (e) => {
        setErr(e);
    };
    const onSuccess = async (res) => {
        setErr("");
        props.onSuccess(res);
    };
    return React.createElement("div", null,
        props.children,
        err && React.createElement("p", { className: "text-red" }, err),
        React.createElement(Button, { text: "Submit", onClick: props.onSubmit, onSuccess: onSuccess, onError: onError }));
}
