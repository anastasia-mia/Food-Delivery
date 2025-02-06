import React from "react";

export const handleEnterPress = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
    callbackFunc: () => void
) => {
    if(event.key === "Enter"){
        event.preventDefault();
        callbackFunc();
    }
}