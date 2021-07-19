

export const useSideBar = ({ setIsMenuOpened }) => {
    
    const handleClick = () => {
        // toggles the menu opened state
        setIsMenuOpened((isMenuOpened) => !isMenuOpened)
    }

    return {
        handleClick,
    }
}