import React, { useEffect, useState } from 'react';
import sendLoginCode from '../functions/sendLoginCode';
import login from '../functions/login';

export default function App(props: { path: string }) {
    const authenticated = typeof localStorage !== "undefined" ? localStorage.getItem("session") : false;
    if (!authenticated) {
        return <Login />
    }
    return <main><div>{props.path}</div></main>
}

function Login() {
    const [stage, setStage] = useState<"phone" | "code" | "success">("phone");
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");

    const submitPhone = async () => {
        await sendLoginCode(phone);
    }

    const submitCode = async () => {
        return await login(phone, code)
    }

    useEffect(() => {
        if (stage !== "success") {
            const session = localStorage.getItem('session');
            if (session) {
                setStage("success")
            }
        }
    }, [])

    if (stage === "phone") {
        return <Form onSubmit={submitPhone} onSuccess={() => {
            setStage("code");
        }}>
            <PhoneField id="phone" name="Phone" value={phone} onChange={setPhone} />
        </Form>
    }

    if (stage === "code") {
        return <Form onSubmit={submitCode} onSuccess={(res) => {
            localStorage.setItem('session', JSON.stringify(res))
            setStage("success");
        }}>
            <CodeField digits={6} id="code" name="Code" value={code} onChange={setCode} />
        </Form>
    }

    if (stage === "success") {
        return <SuccessPrompt message="You have logged in successfully." actions={[
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
        ]} />
    }
}

interface Action {
    primary?: boolean;
    text: string;
    href?: string;
    onClick?: () => Promise<void>;
}

function SuccessPrompt(props: {
    message: string;
    actions: Action[];
}) {
    return <Card>
        <SuccessIcon />
        <p>{props.message}</p>
        {props.actions.map(a => {
            return <Button
                primary={a.primary}
                text={a.text}
                onClick={a.onClick}
                onSuccess={() => { }}
                onError={() => { }}
            />
        })}
    </Card>
}

function SuccessIcon() {
    return <div>✅</div>
}

function CodeField(props: {
    digits: number,
    id: string,
    name: string,
    value: string,
    onChange: (v: string) => void;
}) {
    return <div>
        <label htmlFor={props.id}>{props.name}:</label>
        <input type="text" id={props.id} value={props.value} onChange={e => props.onChange(e.target.value)} />
    </div>
}

function PhoneField(props: {
    id: string,
    name: string,
    value: string,
    onChange: (v: string) => void;
}) {
    return <CodeField digits={10} {...props} />
}

function Card(props: { children: React.ReactNode }) {
    return <div>{props.children}</div>
}

function Form(props: {
    onSubmit: () => Promise<any>,
    onSuccess: (res: any) => void,
    children: React.ReactNode,
}) {
    const [err, setErr] = useState('');
    const onError = (e: string) => {
        setErr(e);
    }
    const onSuccess = async (res: any) => {
        setErr("");
        props.onSuccess(res);
    }
    return <div>
        {props.children}
        {err && <p className='text-red'>{err}</p>}
        <Button text="Submit" onClick={props.onSubmit} onSuccess={onSuccess} onError={onError} />
    </div>
}

function Button(props: {
    text: string,
    onClick: () => Promise<any>,
    onSuccess: (res: any) => void,
    onError: (err: string) => void,
    primary?: boolean,
}) {
    const [loading, setLoading] = useState(false);
    const click = () => {
        setLoading(true);
        props.onClick().then((res) => {
            props.onSuccess(res);
        }).catch(e => {
            props.onError(e.message);
        }).finally(() => {
            setLoading(false);
        })
    }
    return <button
        disabled={loading}
        onClick={click}
    >
        {loading ? "Loading..." : props.text}
    </button>
}