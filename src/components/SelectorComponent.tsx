import { CSSProperties, Dispatch, MutableRefObject, SetStateAction } from "react"
import { AboutOptionTypes, SelectorType } from "../types";

type Props = {
    list: SelectorType[]|AboutOptionTypes[],
    current: SelectorType|AboutOptionTypes,
    setCurrent: Dispatch<SetStateAction<SelectorType>>|Dispatch<SetStateAction<AboutOptionTypes>>|Dispatch<SetStateAction<any>>,
    style:CSSProperties,
    isVertical?: boolean,
    refObject?: MutableRefObject<HTMLElement | null>
}

export const Selector:React.FC<Props> = ({list, current, setCurrent, style, isVertical, refObject}) => {

    return (
        <section
            style={{
                ...style,
                maxWidth: isVertical?100:undefined,
                minHeight: isVertical?undefined:20,
                display:"flex",
                flexDirection: isVertical?"column":"row"
            }}
            ref={(e) => {if(refObject && e) refObject.current = e }}
        >
            <div 
                style={{
                    backgroundColor: "var(--text-primary)",
                    [isVertical?"height":"width"]: isVertical?20:15,
                    minWidth: isVertical?100:undefined,
                    borderRadius: isVertical?"10px 10px 0 0":"10px 0 0 10px"
                }}
            />
            {list.map(item => {
                return (
                    <div 
                        key={item}
                        style={{
                            minWidth: 100,
                            padding: isVertical?"5px 0px 5px 0px":"0px 5px 0px 5px",
                            cursor: "pointer",
                            textAlign: "center",
                            verticalAlign: "middle",
                            color: current===item?"var(--text-primary)":"var(--bg-secondary)",
                            backgroundColor: current===item?"var(--bg)":"var(--text-primary)",
                            boxShadow: current===item?`inset ${isVertical?"0px 5px 5px -5px":"5px 0 5px -5px"} var(--text-primary), inset ${isVertical?"0px -5px 5px -5px":"-5px 0 5px -5px"} var(--text-primary)`:undefined
                        }}
                        onClick={()=>{setCurrent(item)}}
                    >
                        {item}
                    </div>
                )
            })}
            <div
                style={{
                    backgroundColor: "var(--text-primary)",
                    [isVertical?"height":"width"]: 15,
                    minWidth: isVertical?100:undefined,
                    borderRadius: isVertical?"0 0 10px 10px":"0 10px 10px 0"
                }}
            />
        </section>
    )
}