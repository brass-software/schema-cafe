import React, { useEffect, useState } from "react";
import Loading from "./Loading";
export default function Schema(props) {
    const [data, setData] = useState(null);
    useEffect(() => { }, [props.id]);
    if (!data) {
        return React.createElement(Loading, null);
    }
}
