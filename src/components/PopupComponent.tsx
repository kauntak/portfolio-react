import React, { Dispatch, SetStateAction } from "react"


type Props = {
    setIsShown:Dispatch<SetStateAction<boolean>>,
    message: string,
    buttonText?: string,
    onClick?:(e:React.MouseEvent<HTMLButtonElement>) => void
}

export const Popup:React.FC<Props> = ({message, buttonText, setIsShown, onClick}) => {

    const onButtonClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsShown(false);
        if(!onClick) return;
        onClick(e);
    }

    return (
        <>
            <h5 style={{whiteSpace: "pre-line"}}>{message}</h5>
            <button
                onClick={onButtonClick}
            >
                {buttonText?buttonText:"OK"}
            </button>
        </>
    )
}