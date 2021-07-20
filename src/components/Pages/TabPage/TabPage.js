import "./TabPage.css"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apiClient from "services/apiClient";

import { SideBar, PageHeader, Notes, ToDo, Calendar } from "components";
import { Col, Row } from "react-bootstrap";

export default function TabPage() {

    const { mainId } = useParams();
    const [tab, setTab] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);


    // Getting maintab details...
    useEffect(() => {

        const fetchMainTabById = async() => {

            setIsLoading(true);

            try {
                const { data } = await apiClient.getMaintab(mainId)

                if (data?.maintab) {
                    setTab(data.maintab);
                } else {
                    setError("Tab not found");
                }

            } catch (err) {
                    console.log({err})
            }
            
            setIsLoading(false);    
        }

        fetchMainTabById();

    }, [mainId])

    const [width, setWidth] = useState(150)
    const [isMenuOpened, setIsMenuOpened] = useState(false)

    return (
        <div className="TabPage">

            <PageHeader sectionName={tab?.name} />
            <div className="grid-container" style={{ gridTemplateColumns: `${isMenuOpened ? `fit-content` : "0px"} auto`}}>
                <div className="grid-item">
                    <SideBar width={width} setWidth={setWidth} isMenuOpened={isMenuOpened} setIsMenuOpened={setIsMenuOpened} />
                </div>
                <div className="grid-item tab-area">
                    <Row>
                        <Col md={4}>
                            <Row> 
                                <ToDo />
                            </Row>
                            <Row> 
                                <Notes />
                            </Row>
                        </Col>
                        <Col md={8}>
                            <Calendar />
                        </Col>
                    </Row>
                </div>
            </div>


        </div>
    );
}