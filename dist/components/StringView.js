import React from "react";
export default function StringView(props) {
    return React.createElement("input", { type: "text", value: props.value, onChange: e => props.onChange(e.target.value) });
}
