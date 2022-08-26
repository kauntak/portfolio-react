import React, { CSSProperties, RefObject, useContext, useEffect, useLayoutEffect, useState } from "react";
import styles from "./../css/pages.module.css";
import { ScreenSizeContext } from "../context/ScreenSize";
import { PageType } from "../types";
import { usePrevious } from "../hooks/usePrevious";
import { About } from "./About";
import { Contact } from "./Contact";
import { Portfolio } from "./Portfolio";

type Props = {
    page: PageType,
    currentPage: PageType | undefined,
    refs:RefObject<Record<"Portfolio" | "About" | "Contact", HTMLDivElement>>
}

const transitionDelay = "0.5s";

export const Page: React.FC<Props> = ({ page, currentPage, refs }) => {
    const screenSize = useContext(ScreenSizeContext);
    const [style, setStyle] = useState<CSSProperties>();
    const [isMinified, setIsMinified] = useState<boolean>(true);
    const prevPage = usePrevious(currentPage);

    useEffect(() => {
        switch (screenSize) {
            case "small":
            case "medium":
                setIsMinified(true);
                setStyle({
                    height: "fit-content",
                    minHeight: "100%",
                    overflowY: "visible",
                    minWidth: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                })
                break;
            default:
                setIsMinified(false);
                setStyle({
                    maxHeight: "100%",
                    height:"100%",
                    width: "100%",
                    overflow: "hidden",
                    transition: "max-width " + transitionDelay + " ease-in-out",
                    boxShadow: "10px 0 5px -2px #888",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    maxWidth: 0,
                    display: "block"
                })
                break;
        }
    }, [screenSize]);

    useLayoutEffect(() => {
        if(isMinified) return;
        setStyle(oldStyle => {
            const newStyle:CSSProperties = {...oldStyle};
            if(prevPage === page) {
                newStyle.transitionDelay = undefined;
                newStyle.maxWidth = 0;
            } else if(currentPage===page){
                newStyle.maxWidth = "100%";
                if(prevPage=== undefined) newStyle.transitionDelay = undefined;
                else newStyle.transitionDelay = transitionDelay;
            }
            return newStyle;
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])

    return (
        <div
            style={style}
            className={`${styles["panel"]}`}
            ref={element => {
                if(element && refs.current)
                    refs.current[page] = element
            }}
        >
            <div style={{padding: "4vh 4vw 4vh min(8vw, 200px)", margin:0, overflow: "hidden"}}>
                {
                    {
                        "Portfolio": <Portfolio />,
                        "About": <About />,
                        "Contact": <Contact />
                    }[page]
                }
            </div>
        </div>
    )
}