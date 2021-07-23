import "./SideBar.css";

import { Button } from "react-bootstrap";
import { TreeView, TreeItem } from "@material-ui/lab";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from "./SideBarStyles"


export default function SideBar( { isMenuOpened, setIsMenuOpened, directory }) {
  const classes = useStyles()


  const renderTree = (nodes) => (
    <TreeItem key={nodes?.id} nodeId={nodes?.id} label={nodes?.name}>
      {Array.isArray(nodes?.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  const handleClick = () => {
    // toggles the menu opened state
    setIsMenuOpened((isMenuOpened) => !isMenuOpened)
}


  return (
      <section className={`SideBar ${isMenuOpened ? "open" : "closed"}`}>
          <div className="content-wrapper">
              {/* <Button onClick={handleClick} className="toggleBtn">
                <i className="bi-chevron-right"></i>
              </Button> */}
              <div onClick={handleClick} className="toggleBtn">
                <i class="bi-arrow-right-square"></i>
              </div>

              <div className={`my-menu-class ${isMenuOpened ? "open" : "closed"}`}>
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
