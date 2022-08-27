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

    const onBackgroundClick = (e:React.MouseEvent<HTMLDivElement>) => {
        setIsShown(false);
    }

    return (
        <div
            style={{
                position: "fixed",
                top: "0",
                left: "0",
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                zIndex: 100,
                background: "rgba(0,0,0,0.5)"
            }}
            onClick={onBackgroundClick}
        >
            <div
                style={{
                    width: "20vw",
                    maxWidth: "800px",
                    height: "fit-content",
                    padding: 10,
                    backgroundColor: "var(--bg)",
                    border: "2px solid var(--text-primary)",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    position: "absolute",
                    top: "30%",
                    marginLeft: "auto",
                    marginRight: "auto"
                }}
            >
                <h3>{message}</h3>
                <button
                    onClick={onButtonClick}
                >
                    {buttonText?buttonText:"OK"}
                </button>
            </div>
        </div>
    )
}