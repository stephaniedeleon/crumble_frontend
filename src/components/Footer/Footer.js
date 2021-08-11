import "./Footer.css"

import { Link } from "react-router-dom";
import { ExternalLink } from 'react-external-link';

export default function Footer() {
    return (
        <div className="Footer">
            <div className="row align-items-center">
                <div id="footer-col-l" className="col-md-4">
                    <h5>Let's get acquainted</h5>
                    <div className="footer-links">
                        <ExternalLink href="https://www.linkedin.com/in/gevork-manukyan-235385199/"> 
                            <i className="bi-linkedin"/> G
                        </ExternalLink>
                        <ExternalLink href="https://www.linkedin.com/in/stephaniedeleon516/"> 
                            <i className="bi-linkedin"/> S
                        </ExternalLink>
                        <ExternalLink href="https://www.linkedin.com/in/abhirajchatterjee/"> 
                            <i className="bi-linkedin"/> A
                        </ExternalLink>
                    </div>
                </div>
                <div id="footer-col-m" className="col-md-4">
                    <Link to="/about">
                        {/* <img src="images/favicon.ico" alt="Love, Panini small logo" style="max-height: 3.2rem;">
                        <img className="signature" src="images/closing.png" alt="Love, Panini signature"
                            style="max-height: 4.3rem;"> */}
                        <div className="credits">Coded with care by G.S.A.</div>

                    </Link>
                </div>
                <div id="footer-col-r" className="col-md-4">
                    <h5>Looking for more?</h5>
                    <div className="footer-links">
                        <ExternalLink href="https://github.com/CourseHeroGrp1/planner_api"> 
                            <i className="bi-github"/>&nbsp;backend
                        </ExternalLink>
                        <ExternalLink href="https://github.com/CourseHeroGrp1/planner_frontend"> 
                            <i className="bi-github"/>&nbsp;frontend
                        </ExternalLink>
                    </div>
                </div>
            </div>
        </div>
    );
}