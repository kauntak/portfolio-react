import { CSSProperties, Dispatch, SetStateAction } from "react"
import { AboutOptionTypes, SelectorType } from "../types";
import styles from "./../css/selector.module.css";

type Props = {
    list: SelectorType[]|AboutOptionTypes[],
    current: SelectorType|AboutOptionTypes,
    setCurrent: Dispatch<SetStateAction<SelectorType>>|Dispatch<SetStateAction<AboutOptionTypes>>|Dispatch<SetStateAction<any>>,
    style:CSSProperties,
    isVertical?: boolean
}

export const Selector:React.FC<Props> = ({list, current, setCurrent, style, isVertical}) => {

    return (
        <section
            style={{
                ...style,
                maxWidth: isVertical?100:undefined,
                minHeight: isVertical?undefined:20,
                display:"flex",
                flexDirection: isVertical?"column":"row"
            }}
        >
            <div 
                // className={styles["startPiece"]}
                style={{
                    backgroundColor: "var(--button)",
                    [isVertical?"height":"width"]: isVertical?20:15,
                    minWidth: isVertical?100:undefined,
                    borderRadius: isVertical?"10px 10px 0 0":"10px 0 0 10px"
                }}
            />
            {list.map(item => {
                return (
                    <div 
                        key={item}
                        // className={`${styles["label"]} ${current===item?styles["active"]:styles["inactive"]}`}
                        style={{
                            minWidth: 100,
                            // height: isVertical?25:undefined,
                            padding: isVertical?"5px 0px 5px 0px":"0px 5px 0px 5px",
                            cursor: "pointer",
                            textAlign: "center",
                            verticalAlign: "middle",
                            color: "var(--text-secondary)",
                            backgroundColor: current===item?"var(--hover)":"var(--button)",
                            boxShadow: current===item?`inset ${isVertical?"0px 5px 5px -5px":"5px 0 5px -5px"} black, inset ${isVertical?"0px -5px 5px -5px":"-5px 0 5px -5px"} black`:undefined
                        }}
                        onClick={()=>{setCurrent(item)}}
                    >
                        {item}
                    </div>
                )
            })}
            <div
                // className={styles["endPiece"]}
                style={{
                    backgroundColor: "var(--button)",
                    [isVertical?"height":"width"]: 15,
                    minWidth: isVertical?100:undefined,
                    borderRadius: isVertical?"0 0 10px 10px":"0 10px 10px 0"
                }}
            />
        </section>
    )
}