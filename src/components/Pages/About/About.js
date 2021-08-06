import "./About.css";
import { Card } from "react-bootstrap";
import { PageHeader } from "components";
import { Container } from "react-bootstrap";
import ViewProfile from "components/View/ViewProfile/ViewProfile";
import { useState } from "react";

export default function About() {
  const [viewModalShow, setViewModalShow] = useState(false);
  const [currentProfile, setCurrentProfile] = useState({
    name: "",
    text: "",
  });

  const Gevork = {
    name: "Gevork",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  };

  const Stephanie = {
    name: "Stephanie",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  };

  const Abhiraj = {
    name: "Abhiraj",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  };

  const handleClickProfile = (profileObject) => {
    setViewModalShow(true);
    setCurrentProfile({
      name: profileObject.name,
      text: profileObject.text,
    });
  };

  return (
    <div className="About">
        <div className="header">
            <PageHeader sectionName="About us" />
        </div>

      <Container>
        <p className="aboutus-paragraph">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Container>

      <Container>
        <div className="header">
            <PageHeader sectionName="Meet G.S.A" />
        </div>

        <div className="meet-GSA flex-container">
          <div className={`person`} onClick={() => handleClickProfile(Gevork)}>
            <Card className="person-card">
              <Card.Body className="person-card-body">
                <Card.Title className="person-card-title">Gevork</Card.Title>
                <Card.Text className="person-card-text"></Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div
            className={`person`}
            onClick={() => handleClickProfile(Stephanie)}
          >
            <Card className="person-card">
              <Card.Body className="person-card-body">
                <Card.Title className="person-card-title">Stephanie</Card.Title>
                <Card.Text className="person-card-text"></Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className={`person`} onClick={() => handleClickProfile(Abhiraj)}>
            <Card className="person-card">
              <Card.Body className="person-card-body">
                <Card.Title className="person-card-title">Abhiraj</Card.Title>
                <Card.Text className="person-card-text"></Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>

      <Container>
        <div className="header">
            <PageHeader sectionName="Our Mission" />
        </div>

        <div className="our-mission">
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </div>
      </Container>



      <ViewProfile
        show={viewModalShow}
        onHide={() => setViewModalShow(false)}
        name={currentProfile.name}
        text={currentProfile.text}
      />
    </div>
  );
}
