import "./Breadcrumbs.css"
import GlobalContext from "context/global"
import { useContext } from "react"



export default function Breadcrumbs () {

    const { tabNavigationStack, } = useContext(GlobalContext)

    const handleBackClick = () => {

    }

    const handleForwardClick = () => {

    }

    return (
        <div>
            <button>{`<`}</button>
            <button>{`>`}</button>
        </div>
    )
}