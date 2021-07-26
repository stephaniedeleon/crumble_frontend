import "./SideBar.css";

import { TreeView, TreeItem } from "@material-ui/lab";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from "./SideBarStyles"


export default function SideBar( { isMenuOpened, setIsMenuOpened, directory, mainId, setTabNavigationStack }) {
  const classes = useStyles()
  const navigate = useNavigate()

  const navigateToSubtab = (subId) => {
    setTabNavigationStack((oldStack) => [...oldStack, subId])
    
    let correctSubid;
    if (subId === 'root')
      correctSubid = 0;
    else 
      correctSubid = subId
       
    navigate(`/home/${parseInt(mainId)}/${correctSubid}`);
  }

  const renderTree = (nodes) => (
    <TreeItem key={nodes?.id} nodeId={nodes?.id} label={nodes?.name} onLabelClick={() => navigateToSubtab(nodes?.id)} style={{ userSelect: "none" }}>
      {Array.isArray(nodes?.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  const handleClick = () => {
    // toggles the menu opened state
    setIsMenuOpened((isMenuOpened) => !isMenuOpened)
  }


  return (
      <section className={`SideBar ${isMenuOpened ? "" : "closed"}`}>
          <div className={`content-wrapper`}>
              {/* <Button onClick={handleClick} className="toggleBtn">
                <i className="bi-chevron-right"></i>
              </Button> */}
              <div onClick={handleClick} className="toggleBtn">
                {isMenuOpened ? 
                  <i class="bi-arrow-left-square"></i>
                :
                  <i class="bi-arrow-right-square"></i>
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
      </section>
  );
}
