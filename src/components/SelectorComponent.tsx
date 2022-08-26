import { CSSProperties, Dispatch, SetStateAction } from "react"
import { SelectorType } from "../types";
import styles from "./../css/selector.module.css";

type Props = {
    list: SelectorType[],
    current: SelectorType,
    setCurrent: Dispatch<SetStateAction<SelectorType>>,
    style:CSSProperties
}

export const Selector:React.FC<Props> = ({list, current, setCurrent, style}) => {

    return (
        <section
            style={{
                ...style,
                maxWidth: 900,
                display:"flex",
                flexDirection:"row"
            }}
        >
            <div className={styles["startPiece"]}/>
            {list.map(item => {
                return (
                    <div 
                        key={item}
                        className={`${styles["label"]} ${current===item?styles["active"]:styles["inactive"]}`}
                        onClick={()=>{setCurrent(item)}}
                    >
                        {item}
                    </div>
                )
            })}
            <div className={styles["endPiece"]}/>
        </section>
    )
}