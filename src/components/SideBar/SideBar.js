import "./SideBar.css";

import { OffCanvas, OffCanvasMenu } from "react-offcanvas";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";


export default function SideBar() {

    const width = 300
    const [isMenuOpened, setIsMenuOpened] = useState(false)
    
    const handleClick = () => {
        // toggles the menu opened state
        setIsMenuOpened((isMenuOpened) => !isMenuOpened)
    }


  return (
    <div className="SideBar" style={{width: `${width}px`}}>
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
                        <OffCanvasMenu className={"my-menu-class"} style={{ fontWeight: "bold", position: "relative" }}>
                            This is the canvas menu.
                        </OffCanvasMenu>

                    </OffCanvas>
                </Col>
            </Row>
    </div>
  );
}
