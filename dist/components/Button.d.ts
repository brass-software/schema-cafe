import React from "react";
export default function Button(props: {
    text: string;
    onClick: () => Promise<any>;
    onSuccess: (res: any) => void;
    onError: (err: string) => void;
    primary?: boolean;
}): React.JSX.Element;
