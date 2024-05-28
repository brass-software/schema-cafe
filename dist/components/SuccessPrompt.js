import React from 'react';
import Card from './Card';
import SuccessIcon from './SuccessIcon';
import Button from './Button';
export default function SuccessPrompt(props) {
    return React.createElement(Card, null,
        React.createElement(SuccessIcon, null),
        React.createElement("p", null, props.message),
        props.actions.map(a => {
            return React.createElement(Button, { primary: a.primary, text: a.text, onClick: a.onClick, onSuccess: () => { }, onError: () => { } });
        }));
}
