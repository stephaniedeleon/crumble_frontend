import "./SideBar.css";

import { OffCanvas, OffCanvasMenu } from "react-offcanvas";
import { Button, Col, Row } from "react-bootstrap";
import { TreeView, TreeItem } from "@material-ui/lab";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from "./SideBarStyles"
import { useSideBar} from "hooks/useSideBar";

export default function SideBar() {
  const { width, isMenuOpened, handleClick } = useSideBar();
  const classes = useStyles()
  
  const data = {
    id: 'root',
    name: 'Parent',
    children: [
      {
        id: '1',
        name: 'Child - 1',
      },
      {
        id: '3',
        name: 'Child - 3',
        children: [
          {
            id: '4',
            name: 'Child - 4',
            children: [
              {
                id: '5',
                name: 'Child-5',
                children: [
                  {
                    id: '6',
                    name: 'Child-6',
                    children: [
                      {
                        id: '7',
                        name: 'Child-7',
                        
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  return (
      <section className={`SideBar ${isMenuOpened ? "open" : "closed"}`} style={{ width: `${isMenuOpened ? `${width}px` : "0px"}`}}>
          <div className="content-wrapper">
              <Button onClick={handleClick} className="toggleBtn"><i className="bi-chevron-right"></i></Button>

              <div className={`my-menu-class ${isMenuOpened ? "open" : "closed"}`}>
                  <div className="cartTitle"></div>
                  <TreeView
                    className={classes.root}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                  >
                  {renderTree(data)}
                  </TreeView>
              </div>
          </div>
      </section>
  );
}

/*  
          <OffCanvas
            width={width}
            transitionDuration={300}
            isMenuOpened={isMenuOpened}
            position={"left"}
            effect={"overlay"}
          >
            <OffCanvasMenu
              className={`my-menu-class ${isMenuOpened ? "isOpen" : "isClosed"}`}
              style={{
                fontWeight: "bold",
                position: "relative",
                backgroundColor: "darkblue",
                color: "white",
              }}
            >
              <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
              >
               {renderTree(data)}
              </TreeView>
            </OffCanvasMenu>
          </OffCanvas>
*/ 