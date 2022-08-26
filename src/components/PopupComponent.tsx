import React, { Dispatch, SetStateAction } from "react"


type Props = {
    setIsShown:Dispatch<SetStateAction<boolean>>,
    message: string,
    url?:string
}

export const Popup:React.FC<Props> = ({message, url, setIsShown}) => {

    const onClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        setIsShown(false);
        if(url === undefined || url === "") return;
        window.open(url, "_blank");
    }

    return (
        <>
        </>
    )
}