import React, { ReactElement, useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io"
type Props = {
    title:string,
    content:ReactElement
}

const INITIAL_MAX_HEIGHT = 100000;
export const Accordion:React.FC<Props> = ({title, content}) => {
    const [isShown, setIsShown] = useState<boolean>(false);
    const maxHeightRef = useRef<number>(INITIAL_MAX_HEIGHT);
    const accordionRef = useRef<HTMLDivElement>(null);

    useEffect(()=> {
        // console.log(isShown, maxHeightRef.current);
        
    }, [isShown])

    const onHeaderClick = (e:React.MouseEvent<HTMLDivElement>) => {
        setIsShown(prev => {
            if(prev){
                if(accordionRef.current)
                    maxHeightRef.current = accordionRef.current.offsetHeight; 
            } else {
                maxHeightRef.current = INITIAL_MAX_HEIGHT;
            }
            return !prev;
        });
    }

    return (
        <>
            <div
                style={{
                    display:"flex",
                    flexDirection:"row",
                    marginTop: 20,
                    alignContent: "center",
                    cursor: "pointer",
                    backgroundColor: "var(--text-primary)",
                    color: "var(--bg)",
                    maxWidth: "98%"
                }}
                onClick={onHeaderClick}
            >
                <IoIosArrowDown
                    style={{
                        transform: isShown?"rotate(0deg)":"rotate(-90deg)",
                        transition: "transform 0.25s ease",
                        marginTop:"auto",
                        marginBottom: "auto",
                        marginLeft: 20
                    }}
                />
                <h4>{title}</h4>
            </div>
            <div
                style={{
                    maxHeight: isShown?maxHeightRef.current:0,
                    transition: `max-height ${isShown?"0.75s":"0.2s"} ease-in-out`,
                    overflowY:"hidden",
                    padding:"0 2vw 1vh 2vw",
                    backgroundColor: "rgba(0.5,0.5,1,0.2)",
                    maxWidth: "90%",
                    margin: "0 auto 20px auto"
                }}
                ref={accordionRef}
                className="resumeProject"
            >
                {content}
            </div>
        </>
    )
}