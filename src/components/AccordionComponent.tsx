import React, { ReactElement, useState } from "react";

type Props = {
    title:string,
    content:ReactElement
}

export const Accordion:React.FC<Props> = ({title, content}) => {
    const [isShown, setIsShown] = useState<boolean>(false);

    return (
        <>
            <div>
                
            </div>
            <div
            >
                {content}
            </div>
        </>
    )
}