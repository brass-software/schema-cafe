import React from "react";
import CodeField from "./CodeField";
export default function PhoneField(props) {
    return React.createElement(CodeField, { digits: 10, ...props });
}
