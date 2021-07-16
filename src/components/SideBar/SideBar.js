import "./SideBar.css";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

import { OffCanvas, OffCanvasMenu } from "react-offcanvas";
import { Button, Col, Row } from "react-bootstrap";
import { useSideBar } from "hooks/useSideBar";

export default function SideBar() {
  const { width, isMenuOpened, nodes, checked, expanded, setChecked, setExpanded, handleClick } = useSideBar();

  return (
    <div className="SideBar" style={{ width: `${width}px` }}>
      <Row className="mr-0">
        <Col className="menuBtn pr-0">
          <Button onClick={handleClick}>Click</Button>
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
              className={"my-menu-class"}
              style={{ fontWeight: "bold", position: "relative" }}
            >
                This is the canvas menu.
                {/* <CheckboxTree 
                    nodes={nodes}
                    // checked={checked}
                    // expanded={expanded}
                    // onCheck={setChecked({ checked })}
                    // onExpand={setExpanded({ expanded })} 
                /> */}
            </OffCanvasMenu>
          </OffCanvas>
        </Col>
      </Row>
    </div>
  );
}
