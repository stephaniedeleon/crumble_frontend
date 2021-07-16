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
    <div className="SideBar" style={{ width: `${width}px` }}>
      <Row className="mr-0">
        <Col className="menuBtn pr-0">
          <Button onClick={handleClick} className="toggleBtn"><i class="bi-chevron-right"></i></Button>
        </Col>
      </Row>
      <Row className="menuContent  mr-0">
        <Col className="pr-0">
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
        </Col>
      </Row>
    </div>
  );
}
