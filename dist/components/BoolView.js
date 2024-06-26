import React from "react";
export default function BoolView(props) {
    return React.createElement("input", { type: "checkbox", value: JSON.stringify(props.value), onChange: e => props.onChange(e.target.value ? true : false) });
}
