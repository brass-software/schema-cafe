import React, { useEffect, useState } from 'react';
import sendLoginCode from '../functions/sendLoginCode';
import login from '../functions/login';
export default function App(props) {
    const authenticated = localStorage.getItem("session");
    if (!authenticated) {
        return React.createElement(Login, null);
    }
    return React.createElement("main", null,
        React.createElement("div", null, props.path));
}
function Login() {
    const [stage, setStage] = useState("phone");
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");
    const submitPhone = async () => {
        await sendLoginCode(phone);
    };
    const submitCode = async () => {
        return await login(phone, code);
    };
    useEffect(() => {
        if (stage !== "success") {
            const session = localStorage.getItem('session');
            if (session) {
                setStage("success");
            }
        }
    }, []);
    if (stage === "phone") {
        return React.createElement(Form, { onSubmit: submitPhone, onSuccess: () => {
                setStage("code");
            } },
            React.createElement(PhoneField, { id: "phone", name: "Phone", value: phone, onChange: setPhone }));
    }
    if (stage === "code") {
        return React.createElement(Form, { onSubmit: submitCode, onSuccess: (res) => {
                localStorage.setItem('session', JSON.stringify(res));
                setStage("success");
            } },
            React.createElement(CodeField, { digits: 6, id: "code", name: "Code", value: code, onChange: setCode }));
    }
    if (stage === "success") {
        return React.createElement(SuccessPrompt, { message: "You have logged in successfully.", actions: [
                {
                    primary: true,
                    text: "Schemas",
                    href: "/" + phone,
                },
                {
                    text: "Logout",
                    onClick: async () => {
                        localStorage.clear();
                        window.location.href = "/";
                    },
                }
            ] });
    }
}
function SuccessPrompt(props) {
    return React.createElement(Card, null,
        React.createElement(SuccessIcon, null),
        React.createElement("p", null, props.message),
        props.actions.map(a => {
            return React.createElement(Button, { primary: a.primary, text: a.text, onClick: a.onClick, onSuccess: () => { }, onError: () => { } });
        }));
}
function SuccessIcon() {
    return React.createElement("div", null, "\u2705");
}
function CodeField(props) {
    return React.createElement("div", null,
        React.createElement("label", { htmlFor: props.id },
            props.name,
            ":"),
        React.createElement("input", { type: "text", id: props.id, value: props.value, onChange: e => props.onChange(e.target.value) }));
}
function PhoneField(props) {
    return React.createElement(CodeField, { digits: 10, ...props });
}
function Card(props) {
    return React.createElement("div", null, props.children);
}
function Form(props) {
    const [err, setErr] = useState('');
    const onError = (e) => {
        setErr(e);
    };
    const onSuccess = async (res) => {
        setErr("");
        props.onSuccess(res);
    };
    return React.createElement("div", null,
        props.children,
        err && React.createElement("p", { className: 'text-red' }, err),
        React.createElement(Button, { text: "Submit", onClick: props.onSubmit, onSuccess: onSuccess, onError: onError }));
}
function Button(props) {
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
