import React, { useContext, useEffect, useRef, useState } from "react"
import { BiRightArrow, BiLeftArrow } from "react-icons/bi"
import { MinifiedContext } from "../context/MinifiedContext"
import { DesignType } from "../types"


type Props = {
    list: DesignType[]
}
const dragPrecision = 150;

export const Carousel: React.FC<Props> = ({ list }) => {
    const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);
    const moveToIndexRef = useRef<number>(0);
    const isMinified = useContext(MinifiedContext);
    const [dragPosition, setDragPosition] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const wasDraggingRef = useRef<boolean>(false);

    useEffect(()=>{
        if(dragPosition < -dragPrecision) {
            setCurrentItemIndex(currentIndex => {
                if(currentIndex === list.length - 1) {
                    setDragPosition(0);
                    return currentIndex;
                }
                setDragPosition(0);
                return currentIndex + 1;
            });
        } else if(dragPosition > dragPrecision) {
            setCurrentItemIndex(currentIndex => {
                if(currentIndex === 0) {
                    setDragPosition(0);
                    return 0;
                }
                setDragPosition(0);
                return currentIndex - 1;
            });
        }
    }, [dragPosition])


    const onRightClick = (e: React.MouseEvent<SVGElement>) => {
        setCurrentItemIndex(i => {
            i++;
            if (i === list.length) i = 0;
            return i;
        })
        
    }

    const onLeftClick = (e: React.MouseEvent<SVGElement>) => {
        setCurrentItemIndex(i => {
            i--;
            if (i === -1) i = list.length - 1;
            return i;
        })
    }

    const onPositionClick = (e:React.MouseEvent, index: number) => {
        if(isDragging || wasDraggingRef.current) {
            wasDraggingRef.current = false;
            return;
        }
        console.log("test");
        if(isMinified) setCurrentItemIndex(index);
        else {
            if(Math.abs(index - currentItemIndex) <= 1){
                setCurrentItemIndex(index);
                return;
            }
            moveToIndexRef.current = index;
            const interval = setInterval(() => {
                setCurrentItemIndex(oldIndex => {
                    const moveAmount: number = oldIndex > moveToIndexRef.current ? -1 : 1;
                    const newIndex = oldIndex + moveAmount;
                    if(newIndex === moveToIndexRef.current) clearInterval(interval);
                    return newIndex;
                })
            }, 50)
        }
        e.stopPropagation();
        e.preventDefault();
        return false;
    }


    const onPointerDown = (e:React.MouseEvent<HTMLDivElement>) => {
        wasDraggingRef.current = false;
        setIsDragging(true);
        e.stopPropagation();
        e.preventDefault();
        return false;
    }

    const onPointerUp = (e:React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(false);
        setDragPosition(0);
    }

    const onPointerMove = (e:React.MouseEvent<HTMLDivElement>) => {
        if(!isDragging) return;
        wasDraggingRef.current = true;
        setDragPosition(x => x + e.movementX);
        e.stopPropagation();
        e.preventDefault();
        return false;
    }

    return (
        <>
            <div
                style={{
                    display:"flex",
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center",
                    height: "50vh",
                    width: 900,
                    maxWidth: "80vw",
                    position: "relative",
                    justifyContent: isMinified?"space-evenly":undefined,
                    marginTop: 10
                }}
                onPointerUp={onPointerUp}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
            >
                {
                    isMinified
                    ?<>
                        <BiLeftArrow 
                            onClick={onLeftClick} 
                            style={{
                                position:"absolute",
                                top: "50%",
                                left: "10px",
                                cursor: "pointer"
                            }}
                        />
                        <img 
                            src={list[currentItemIndex].imagePath}
                            alt={list[currentItemIndex].projectName}
                            title={list[currentItemIndex].projectName}
                            style={{
                                maxHeight: "48vh",
                                maxWidth: "40vw"
                            }}

                        />
                        <BiRightArrow 
                            onClick={onRightClick}
                            style={{
                                position:"absolute",
                                top: "50%",
                                right: "10px"
                            }}
                        />
                    </>
                    :<>
                        {
                            list.map((item, index) => {
                                const position = index - currentItemIndex;
                                return (
                                    <img
                                        key={index}
                                        src={item.imagePath}
                                        alt={item.projectName}
                                        title={item.projectName}
                                        style={{
                                            position:"absolute",
                                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                                            left: 450,
                                            transform: `translateX(calc(${position * 400 - dragPosition}px - 50%)`,
                                            opacity: index===currentItemIndex?1:0.5,
                                            transition: "all 0.5s ease-in-out",
                                            maxHeight: index===currentItemIndex?"48vh":"24vh",
                                            maxWidth: index===currentItemIndex?"30vw":"15vw",
                                            padding: 15,
                                            zIndex: index===currentItemIndex?100:undefined
                                        }}
                                        onClick={(e) => { onPositionClick(e, index); }}
                                        draggable={false}
                                    />
                                )
                            })
                        }
                    </>
                }
            </div>
            <h5 
                style={{
                    margin:5, 
                    position:"relative", 
                    display: "flex",
                    flexDirection: "row",
                    alignItems:"center",
                    alignContent:"center",
                    justifyContent: "center"
                }}
            >
                {list[currentItemIndex]?list[currentItemIndex].projectName:""}
            </h5>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                {list.map((item, index) => {
                    return (
                        <span
                            key={index}
                            style={{
                                cursor: "pointer",
                                height: "15px",
                                width: "15px",
                                borderRadius: "50%",
                                margin: "2px",
                                display: "inline-block",
                                transition: "background-color 0.1s ease",
                                backgroundColor: (currentItemIndex === index) ? "var(--text-secondary)" : "var(--button)"
                            }}
                            title={item.projectName}
                            onClick={(e) => { onPositionClick(e, index); }}
                        />
                    )
                })}
            </div>
        </>
    )
}