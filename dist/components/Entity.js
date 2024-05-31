import React, { useEffect, useState } from "react";
import StringView from "./StringView";
import BoolView from "./BoolView";
import IntView from "./IntView";
export default function Entity(props) {
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const [data, setData] = useState(null);
    const session = JSON.parse(localStorage.getItem('session'));
    useEffect(() => {
        setLoading(true);
        fetch(props.jsonURL, {
            headers: {
                Authorization: "Token " + session.Token,
            },
        }).then((res) => {
            if (res.ok) {
                res.json().then(d => {
                    setData(d);
                });
            }
            else {
                res.text().then(t => {
                    setErr(t);
                });
            }
        }).catch(e => {
            setErr(e.message);
        }).finally(() => {
            setLoading(false);
        });
    }, [props.jsonURL]);
    if (err !== "") {
        return React.createElement("div", null, err);
    }
    if (props.type.IsScalar) {
        switch (props.type.Kind) {
            case "string":
                return React.createElement(StringView, { value: data, onChange: setData });
            case "bool":
                return React.createElement(BoolView, { value: data, onChange: setData });
            case "int":
                return React.createElement(IntView, { value: data, onChange: setData });
            default:
                throw new Error("unknown type '" + props.type.Kind + "'");
        }
    }
    if (props.type.IsPointer) {
        throw new Error("pointers not yet implemented");
    }
    if (props.type.IsArray) {
        throw new Error("arrays not implemented");
    }
    if (props.type.IsMap) {
        throw new Error("arrays not implemented");
    }
    if (props.type.IsStruct) {
        React.createElement("div", null, props.type.Fields.map(f => {
            const url = window.location + "/" + f.ID;
            return React.createElement("div", null,
                React.createElement("a", { href: url }, f.Name));
        }));
    }
    return React.createElement("div", null);
}
