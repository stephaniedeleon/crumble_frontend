import GlobalContext from "context/global"
import { useContext } from "react"
import { useNavigate } from "react-router-dom";



export const useBreadcrumbs = ({mainId, subId}) => {

    
    const { tabNavigationStack, setTabNavigationStack } = useContext(GlobalContext)
    const navigate = useNavigate()

    const handleBackClick = () => {
        
        if (tabNavigationStack.currentPosition > 0) {
            setTabNavigationStack((object) => ({
                currentPosition: object.currentPosition - 1,
                stack: object.stack
            }))
    
            // We use '-1' here because the tabNavigationStack state has NOT been updated by react by the time this code is run
            // handles when currentPosition is 'root'
            if (tabNavigationStack.stack[tabNavigationStack.currentPosition - 1] === 'root')
                navigate(`/home/${parseInt(mainId)}/${0}`);
            else
                navigate(`/home/${parseInt(mainId)}/${parseInt(tabNavigationStack.stack[tabNavigationStack.currentPosition - 1])}`);
        }
    }

    const handleForwardClick = () => {

        if (tabNavigationStack.currentPosition < tabNavigationStack.stack.length - 1) {
            setTabNavigationStack((object) => ({
                currentPosition: object.currentPosition + 1,
                stack: object.stack
            }))
            
            if (tabNavigationStack.stack[tabNavigationStack.currentPosition + 1] === 'root')
                navigate(`/home/${parseInt(mainId)}/${0}`);
            else
                navigate(`/home/${parseInt(mainId)}/${parseInt(tabNavigationStack.stack[tabNavigationStack.currentPosition + 1])}`);
        }
    }

    return {
        handleBackClick,
        handleForwardClick,
    }

}