import React from "react";
export default function Form(props: {
    onSubmit: () => Promise<any>;
    onSuccess: (res: any) => void;
    children: React.ReactNode;
}): React.JSX.Element;
