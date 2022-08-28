import React, { Dispatch, ReactElement, SetStateAction } from "react"
import { BiX } from "react-icons/bi";


type Props = {
    setIsShown:Dispatch<SetStateAction<boolean>>,
    modal: ReactElement;
}

export const Modal:React.FC<Props> = ({setIsShown, modal}) => {

    const onBackgroundClick = (e:React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
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
                    width: "fit-content",
                    maxWidth: "1000px",
                    height: "fit-content",
                    maxHeight: "60vh",
                    padding: 10,
                    backgroundColor: "var(--bg)",
                    border: "2px solid var(--text-primary)",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    position: "absolute",
                    top: "40%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    overflow: "hidden"
                }}
                onClick={e => e.stopPropagation()}
            >
                <BiX 
                    style={{
                        position:"absolute",
                        top: 10,
                        right: 10,
                        cursor:"pointer"
                    }}
                    onClick={()=>setIsShown(false)}
                />
                {modal}
            </div>
        </div>
    )
}