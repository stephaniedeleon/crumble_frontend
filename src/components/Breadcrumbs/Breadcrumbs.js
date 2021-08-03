import "./Breadcrumbs.css"
import { useBreadcrumbs } from "hooks/useBreadcrumbs"
import { useEffect } from "react"




export default function Breadcrumbs ({mainId, subId}) {

    const { handleBackClick, handleForwardClick } = useBreadcrumbs({mainId, subId})

    useEffect (() => {
        
    })

    return (
        <div>
            <button onClick={handleBackClick}>{`<`}</button>
            <button onClick={handleForwardClick}>{`>`}</button>
        </div>
    )
}