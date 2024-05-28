import React, { useState } from "react";
export default function Button(props) {
    const [loading, setLoading] = useState(false);
    const click = () => {
        setLoading(true);
        props.onClick().then((res) => {
            props.onSuccess(res);
        }).catch(e => {
            props.onError(e.message);
        }).finally(() => {
            setLoading(false);
        });
    };
    return React.createElement("button", { disabled: loading, onClick: click }, loading ? "Loading..." : props.text);
}
