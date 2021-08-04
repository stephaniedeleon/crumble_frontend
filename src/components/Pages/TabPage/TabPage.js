import "./TabPage.css";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import AuthContext from "context/auth";
import GlobalContext from "context/global";
import apiClient from "services/apiClient";

import { SideBar, PageHeader, Notes, ToDo, Calendar } from "components";
import { Col, Row } from "react-bootstrap";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";


export default function TabPage() {
  
  const [tab, setTab] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [width, setWidth] = useState(180);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [directory, setDirectory] = useState({});
  
  const { mainId, subId } = useParams();
  const { user } = useContext(AuthContext);
  const { setTabNavigationStack } = useContext(GlobalContext);


  // Getting tab details...
  useEffect(() => {
    const fetchTabById = async () => {

      setIsLoading(true);

      
      if (parseInt(subId) === 0) {

          const { data } = await apiClient.getMaintab(mainId);

          if (data?.maintab) {
            setTab(data.maintab);
          } else {
            setError("Tab not found");
          }

      } else {

          const { data } = await apiClient.getSubtab(parseInt(subId));
          
          if (data?.subtab) {
            setTab(data.subtab);
          } else {
            setError("Tab not found");
          }

        }
      
      // Get directory data to use for sidebar
      const result = await apiClient.getDirectoryData(mainId);
      setDirectory(result?.directoryData);


      setIsLoading(false);
    };

    fetchTabById();

  }, [mainId, setTabNavigationStack, subId, user]);


  return (
    <div className="TabPage">

      <PageHeader sectionName={tab?.name} />
      <div
        className={`grid-container`}
        // style={{
        //   gridTemplateColumns: `${isMenuOpened ? `120px` : "0px"} auto`,
        // }}
      >
        <div className={`sidebar ${isMenuOpened ? "open" : ""}`}>
            <SideBar
              isMenuOpened={isMenuOpened}
              setIsMenuOpened={setIsMenuOpened}
              directory={directory}
              mainId={mainId}
            />
        </div>
        <div className="tab-area">
          <Row>
            <Row className="my-1">
              <Col className={`navigation-buttons`}>
                <div className="toggleBtn" onClick={() => setIsMenuOpened(!isMenuOpened)}>
                  {isMenuOpened ?
                    <>
                    </>

                    :

                    <i class="bi-list"></i>
                  }
                </div>
                <Breadcrumbs mainId={mainId} subId={subId} />
              </Col>
            </Row>
            <Col md={4}>
              <Row>
                <ToDo mainId={mainId} subId={subId} directory={directory} />
              </Row>
              <Row>
                <Calendar />
              </Row>
            </Col>
            <Col md={8}>
              <Notes mainId={mainId} subId={subId} />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
