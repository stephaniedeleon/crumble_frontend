import "./TabPage.css";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import AuthContext from "context/auth";
import apiClient from "services/apiClient";

import { SideBar, PageHeader, Notes, ToDo, Calendar } from "components";
import { Col, Row } from "react-bootstrap";


export default function TabPage() {
  
  const [tab, setTab] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [width, setWidth] = useState(180);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [directory, setDirectory] = useState({});
  
  const { mainId, subId } = useParams();
  const { setTabNavigationStack, user } = useContext(AuthContext);


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
        className="grid-container"
        style={{
          gridTemplateColumns: `${isMenuOpened ? `${width}px` : "0px"} auto`,
        }}
      >
        <div className="grid-item">
            <SideBar
              width={width}
              setWidth={setWidth}
              isMenuOpened={isMenuOpened}
              setIsMenuOpened={setIsMenuOpened}
              directory={directory}
              setDirectory={setDirectory}
              mainId={mainId}
              setTabNavigationStack={setTabNavigationStack}
            />
        </div>
        <div className="grid-item tab-area">
          <Row>
            <Col md={4}>
              <Row>
                <ToDo mainId={mainId} subId={subId} directory={directory} />
              </Row>
              <Row>
                <Calendar />
              </Row>
            </Col>
            <Col md={8}>
              <Notes />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
