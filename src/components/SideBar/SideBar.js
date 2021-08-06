import "./SideBar.css";

import { TreeView, TreeItem } from "@material-ui/lab";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from "./SideBarStyles"
import GlobalContext from "context/global";
import { useContext } from "react";


export default function SideBar( { isMenuOpened, setIsMenuOpened, directory, mainId, miniMenu, setMiniMenu }) {
  const classes = useStyles()
  const navigate = useNavigate()
  const { digIntoTab } = useContext(GlobalContext)

  const navigateToSubtab = (event, subId) => {
    event.preventDefault()
    
    let correctSubid;
    if (subId === 'root')
      correctSubid = 0;
    else 
      correctSubid = subId
       
    digIntoTab(correctSubid)
    navigate(`/home/${parseInt(mainId)}/${correctSubid}`);
  }

  const renderTree = (nodes) => (
    <TreeItem className={`treeItem ${nodes?.id}`} key={nodes?.id} nodeId={nodes?.id} label={nodes?.name} onLabelClick={(event) => navigateToSubtab(event, nodes?.id)} style={{ userSelect: "none" }}>
      {Array.isArray(nodes?.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  const handleClick = () => {
    // toggles the menu opened state
    setIsMenuOpened((isMenuOpened) => !isMenuOpened)
  }

  const handleOnMouseOver = () => {
    if (!isMenuOpened)
      setMiniMenu(true)
  }

  const handleOnMouseOut = () => {
    if (!isMenuOpened)
    setMiniMenu(false)
  }

  return (
      <div className={`SideBar ${isMenuOpened ? "open" : "closed"} ${miniMenu ? "miniMenu-open" : ""}`}>

        <div className={`invisDiv`} onMouseOver={handleOnMouseOver} onMouseOut={handleOnMouseOut}></div>

        <div className={`content-wrapper`}>

          <div className="sidebar-header">
            <div className="sidebar-title" onClick={(event) => navigateToSubtab(event, directory?.id)} style={miniMenu ? { paddingLeft: "0px" } : {}}>
              {directory.name}
            </div>

            <div className="toggleBtn" style={miniMenu ? {display: "none"} : {}}>
                <i class="bi-arrow-left-square" onClick={handleClick}></i>
            </div>
          </div>

            <div className={`my-menu-class`}>
                <div className="cartTitle"></div>
                <TreeView
                  className={classes.root}
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  defaultExpanded={['root']}
                >
                {renderTree(directory)}
                </TreeView>
            </div>
        </div>
      </div>
  );
}
