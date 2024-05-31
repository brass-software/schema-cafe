import React from "react";
export default function IntView(props) {
    return React.createElement("input", { type: "number", value: props.value, onChange: e => props.onChange(JSON.parse(e.target.value)) });
}
