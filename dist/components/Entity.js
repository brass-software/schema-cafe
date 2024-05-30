import React, { useEffect, useState } from "react";
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
    }
    if (props.type.IsPointer) {
    }
    if (props.type.IsArray) {
    }
    if (props.type.IsMap) {
    }
    if (props.type.IsStruct) {
    }
    return React.createElement("div", null);
}
