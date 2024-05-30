import React, { useEffect, useState } from "react";
import Type from "../types/Type";
import Session from "../types/Session";

export default function Entity(props: {
    jsonURL: string;
    type: Type;
}) {
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const [data, setData] = useState<any>(null);

    const session: Session = JSON.parse(localStorage.getItem('session'));

    useEffect(() => {
        setLoading(true);
        fetch(props.jsonURL, {
            headers: {
                Authorization: "Token "+session.Token,
            },
        }).then((res) => {
            if (res.ok) {
                res.json().then(d => {
                    setData(d);
                });
            } else {
                res.text().then(t => {
                    setErr(t)
                });
            }
        }).catch(e => {
            setErr(e.message);
        }).finally(() => {
            setLoading(false);
        })
    }, [props.jsonURL]);

    if (err !== "") {
        return <div>{err}</div>
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

    return <div></div>
}