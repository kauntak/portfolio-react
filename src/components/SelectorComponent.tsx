import { Dispatch, SetStateAction } from "react"
import { SelectorType } from "../pages/Portfolio";
import styles from "./../css/selector.module.css";

type Props = {
    list: SelectorType[],
    current: SelectorType,
    setCurrent: Dispatch<SetStateAction<SelectorType>>
}

export const Selector:React.FC<Props> = ({list, current, setCurrent}) => {

    return (
        <section
            style={{
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