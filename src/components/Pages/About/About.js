import "./About.css";
import { ExternalLink } from 'react-external-link';
import { Card } from "react-bootstrap";
import { PageHeader, gevork, stephanie, abhiraj } from "components";
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
    name: "Gevork Manukyan",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  };

  const Stephanie = {
    name: "Stephanie De Leon",
    text: "Hello, world! I'm a third-year undergraduate student at California State Polytechnic University, Pomona, graduating in 2023 with a Bachelor's Degree in Computer Science. My passion for helping others has continuously driven me to find opportunities to grow and expand my knowledge and experience. I'm excited that our app will increase productivity and motivation as we continue to improve Crumble!",
  };

  const Abhiraj = {
    name: "Abhiraj Chatterjee",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  };

  const handleClickProfile = (profileObject) => {
    setViewModalShow(true);

    console.log(profileObject)

    setCurrentProfile({
      name: profileObject.name,
      text: profileObject.text,
    });
  };

  return (
    <div className="About">
        <div className="header">
            <PageHeader sectionName="About Us" />
        </div>

      <Container className="section">

        <div className="subtitle intro">
          <h4>Our story</h4>
        </div>

        <div className="about-us">
          
          <div className="aboutus-paragraph">
            <p>
              <span className="crumble">Crumble</span> was developed by three full-stack interns who crossed paths in the CodePath Summer Internship for 
              Tech Excellence (SITE) Program. Our vision is to provide a versatile web planning tool that allows users to 
              easily manage their deadlines by <span className="crumbling">"crumbling"</span> complex assignments into smaller, digestible tasks.
            </p>
          </div>

          <div className="about-logo intro">
            <img src="https://img.icons8.com/bubbles/320/000000/edit.png" alt="crumble logo"/>
          </div>

        </div>

        <div className="definition">
          <div className="word">
            <h5>crum·ble</h5>
            <h6>/ˈkrəmbəl/</h6>
          </div>
          <h6>cause (something) to break apart into small fragments.</h6>
        </div>

        <div className="about-us inspiration">

          <div className="about-logo inspiration">
            <div className="left">
              <img src="https://img.icons8.com/bubbles/130/000000/checklist.png" alt="todo list icon"/>
            </div>
            <div className="right">
              <img src="https://img.icons8.com/bubbles/130/000000/notes-app.png" alt="notes icon"/>   
            </div>
            <div className="left">
              <img src="https://img.icons8.com/bubbles/130/000000/timeline-week.png" alt="calendar icon"/>  
            </div>
          </div>
          
          <div className="aboutus-paragraph">
            <p>
              <span className="crumble">Crumble</span> was brought to life during our internship at CodePath. 
              We were often tasked to plan and develop large, complex projects that were overwhelming and hard to manage. We tried existing planner apps, but most were too 
              difficult to use, lacked an essential feature, or made to-do lists overwhelming.  As tasks piled on and our search for the perfect app 
              continued, we decided to create our own!
            </p>
          </div>

        </div>

      </Container>


      <Container className="section">
        <div className="subtitle">
          <h4>What make us unique?</h4>
        </div>

        <div className="our-mission">
          <div className="mission">
            
            <div className="mission-paragraph unique">
              <p>
                {/* Managing large-scale projects or assignments is difficult due to complex scope and competing priorities.
                <br/> */}
                <span className="crumble">Crumble</span>'s purpose is to help users by providing a platform that solely 
                focuses on <span className="crumbling">"crumbling"</span> overwhelming assignments into more bearable pieces, at the same time, 
                reminding them to take breaks to ensure maximum productivity.

                {/* <span className="crumble">Crumble</span>'s purpose is to help users be more productive by providing a platform that
                solely focuses on breaking down complex assignments into smaller, more bearable pieces. At the same time, reminding them 
                to take breaks to ensure maximum productivity. */}
              </p>

            </div>

            <div className="mission-paragraph features">
              <p>
                Key features include:                
                
                <div className="features">
                  <ul>
                    <li>A Pomodoro Timer to manage distractions and control your time</li>
                    <li>Maintabs and Subtabs to <span className="crumbling">"crumble"</span> tasks</li>
                    <li>A SideBar to navigate through your tab pages</li>
                    <li>Tab pages containing a todo list side by side with a calendar, a notes section, and a mini pomodoro timer</li>
                  </ul>
                </div>
              </p>

            </div>

          </div>
        </div>
      </Container>


      {/** Meet GSA */}

      <Container className="section">
        <div className="subtitle">
          <h4>Meet G.S.A.</h4>
        </div>

        <div className="meet-GSA flex-container">

        {/** Gevork */}
          <div 
            className={`person`} 
          >
            <Card className="person-card">
              <Card.Body className="person-card-body">
                <img src={gevork} alt="picture of gevork" className="profile-pic" onClick={() => handleClickProfile(Gevork)}/>
                <Card.Text className="person-card-text">
                  <div className="profile-name">Gevork Manukyan</div>
                  <div className="profile-position">Co-Creator</div>
                  <div className="social-medias">
                    <ExternalLink href="https://www.linkedin.com/in/gevork-manukyan-235385199/"> 
                        <i className="bi-linkedin"/>
                    </ExternalLink>
                    <ExternalLink href="https://github.com/Gevork-Manukyan"> 
                        <i className="bi-github"/>
                    </ExternalLink>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          {/** Stephanie */}
          <div
            className={`person`}
          >
            <Card className="person-card">
              <Card.Body className="person-card-body">
                <img src={stephanie} alt="picture of stephanie" className="profile-pic" onClick={() => handleClickProfile(Stephanie)}/>
                <Card.Text className="person-card-text">    
                  <div className="profile-name">Stephanie De Leon</div>
                  <div className="profile-position">Co-Creator</div>
                  <div className="social-medias">
                    <ExternalLink href="https://www.linkedin.com/in/stephaniedeleon516/"> 
                        <i className="bi-linkedin"/>
                    </ExternalLink>
                    <ExternalLink href="https://github.com/stephaniedeleon"> 
                        <i className="bi-github"/>
                    </ExternalLink>
                  </div>        
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          {/** Abhiraj */}
          <div 
            className={`person`} 
          >
            <Card className="person-card">
              <Card.Body className="person-card-body">
                <img src={abhiraj} alt="picture of abhiraj" className="profile-pic" onClick={() => handleClickProfile(Abhiraj)} />
                <Card.Text className="person-card-text">
                  <div className="profile-name">Abhiraj Chatterjee</div>
                  <div className="profile-position">Co-Creator</div>
                  <div className="social-medias">
                    <ExternalLink href="https://www.linkedin.com/in/abhirajchatterjee/"> 
                        <i className="bi-linkedin"/>
                    </ExternalLink>
                    <ExternalLink href="https://github.com/abhiraj-chatterjee"> 
                        <i className="bi-github"/>
                    </ExternalLink>
                  </div>        
                </Card.Text>                
              </Card.Body>
            </Card>
          </div>

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
