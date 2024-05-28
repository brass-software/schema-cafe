import React from "react";
export default function CodeField(props) {
    return React.createElement("div", null,
        React.createElement("label", { htmlFor: props.id },
            props.name,
            ":"),
        React.createElement("input", { type: "text", id: props.id, value: props.value, onChange: e => props.onChange(e.target.value) }));
}
