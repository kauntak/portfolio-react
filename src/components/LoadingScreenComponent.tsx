import React, { CSSProperties, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import styles from "./../css/loading.module.css";

type Props = {
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

const MAX_COUNT = 8;
const MIN_COUNT = 5;

export const LoadingScreenComponent:React.FC<Props> = ({setIsLoading}) => {
    const [spinnerStyle, setSpinnerStyle] = useState<CSSProperties>({position:"relative", marginLeft:"auto", marginRight:"auto", top:"40vh"});
    const intervalCountRef = useRef<number>(0);
    const transitionStyle:CSSProperties = {transition: "all 0.25s ease-in-out", height:"fit-content"}
    const [loadFinishStyle, setLoadFinishStyle] = useState<CSSProperties>({});
    const [loadingStyle, setLoadingStyle] = useState<CSSProperties[]> (Array(7).fill({
        ...transitionStyle
    }));

    useEffect(() => {
        const finishCount = Math.floor(Math.random() * (MAX_COUNT - MIN_COUNT + 1) + MIN_COUNT);
        const interval = setInterval(()=> {
            const index = intervalCountRef.current % loadingStyle.length;
            setLoadingStyle(oldStyle => {
                const newStyle = [...oldStyle];
                if(intervalCountRef.current <= finishCount) {
                    newStyle[index] = {
                        ...transitionStyle,
                        transform: "scale(1.5)"
                    }
                }
                const prevIndex = index === 0 ? loadingStyle.length - 1 : index - 1;
                newStyle[prevIndex] = {
                    ...transitionStyle
                }
                return newStyle;
            })
            intervalCountRef.current++;
            if(intervalCountRef.current > finishCount){
                clearInterval(interval);
                setTimeout(()=> {
                    setLoadFinishStyle({
                        transition: "all 0.5s ease-in-out",
                        opacity: 0,
                        height:"fit-content",
                        transform: "scale(4)"
                    })
                }, 250)
            }
        }, 250)

        return () => {
            clearInterval(interval);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    const onMouseMove = (e:React.MouseEvent)=>{
        setSpinnerStyle({top:e.clientY, left:e.clientX, position:"absolute"})
    }

    const onTransitionEnd = (e:React.TransitionEvent) => {
        if(e.currentTarget === e.target)
            setIsLoading(false);
    }
    
    return (
        <div
            onMouseMove={onMouseMove}
            style={{
                cursor:"none",
                position: "fixed",
                width: "100vw",
                height: "100vh",
                margin: 0,
                padding: 0,
                backgroundColor: "var(--bg)",
                zIndex: 1000,
                display:"flex",
                flexDirection:"column",
                top:0,
                left:0
            }}
        >
            <div
                onTransitionEnd={onTransitionEnd}
                style={{
                    ...loadFinishStyle, 
                    display:"flex", 
                    flexDirection:"row", 
                    position:"relative", 
                    top:"35vh", 
                    marginLeft: "auto", 
                    marginRight:"auto"
                }}
            >
                <h4 style={loadingStyle[0]}>L</h4>
                <h4 style={loadingStyle[1]}>0</h4>
                <h4 style={loadingStyle[2]}>A</h4>
                <h4 style={loadingStyle[3]}>D</h4>
                <h4 style={loadingStyle[4]}>I</h4>
                <h4 style={loadingStyle[5]}>N</h4>
                <h4 style={loadingStyle[6]}>G</h4>
            </div>
            <div style={spinnerStyle}>
                <div className={styles["lds-default"]}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
    )
}