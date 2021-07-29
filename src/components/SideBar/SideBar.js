import "./SideBar.css";

import { TreeView, TreeItem } from "@material-ui/lab";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from "./SideBarStyles"


export default function SideBar( { isMenuOpened, setIsMenuOpened, directory, mainId, setTabNavigationStack }) {
  const classes = useStyles()
  const navigate = useNavigate()

  const navigateToSubtab = (event, subId) => {
    event.preventDefault()
    setTabNavigationStack((oldStack) => [...oldStack, subId])
    
    let correctSubid;
    if (subId === 'root')
      correctSubid = 0;
    else 
      correctSubid = subId
       
    navigate(`/home/${parseInt(mainId)}/${correctSubid}`);
  }

  const renderTree = (nodes) => (
    <TreeItem key={nodes?.id} nodeId={nodes?.id} label={nodes?.name} onLabelClick={(event) => navigateToSubtab(event, nodes?.id)} style={{ userSelect: "none" }}>
      {Array.isArray(nodes?.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  const handleClick = () => {
    // toggles the menu opened state
    setIsMenuOpened((isMenuOpened) => !isMenuOpened)
  }


  return (
      <div className={`SideBar ${isMenuOpened ? "" : "closed"}`}>
        <div className={`content-wrapper`}>
            <div className="toggleBtn">
              {isMenuOpened ? 
                  <i class="bi-arrow-left-square" onClick={handleClick}></i>
              :
                <i class="bi-list" onClick={handleClick}></i>
                // <i class="bi-arrow-right-square" onClick={handleClick}></i>
              }
            </div>

            <div className={`my-menu-class`}>
                <div className="cartTitle"></div>
                <TreeView
                  className={classes.root}
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                >
                {renderTree(directory)}
                </TreeView>
            </div>
        </div>
      </div>
  );
}
