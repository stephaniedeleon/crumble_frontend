import "./Footer.css"

import { Link } from "react-router-dom";
import { ExternalLink } from 'react-external-link';

export default function Footer() {
    return (
        <div className="Footer">
            <div class="row align-items-center">
                <div id="footer-col-l" class="col-md-4">
                    <h5>Let's get acquainted_</h5>
                    <div class="footer-links">
                        <ExternalLink href="https://www.linkedin.com/in/gevork-manukyan-235385199/"> 
                        <i class="bi-linkedin"/> G
                        </ExternalLink>
                        <ExternalLink href="https://www.linkedin.com/in/stephanie-de-leon-a902b717a/"> 
                            <i class="bi-linkedin"/> S
                        </ExternalLink>
                        <ExternalLink href="https://www.linkedin.com/in/abhirajchatterjee/"> 
                            <i class="bi-linkedin"/> A
                        </ExternalLink>
                    </div>
                </div>
                <div id="footer-col-m" class="col-md-4">
                    <Link to="/about">
                        {/* <img src="images/favicon.ico" alt="Love, Panini small logo" style="max-height: 3.2rem;">
                        <img class="signature" src="images/closing.png" alt="Love, Panini signature"
                            style="max-height: 4.3rem;"> */}
                        <div className="credits">Coded with care by G.S.A.</div>

                    </Link>
                </div>
                <div id="footer-col-r" class="col-md-4">
                    <h5>Looking for more?_</h5>
                    <div class="footer-links">
                        <ExternalLink href="https://github.com/CourseHeroGrp1/planner_api"> 
                            <i class="bi-github"/> api
                        </ExternalLink>
                        <ExternalLink href="https://github.com/CourseHeroGrp1/planner_frontend"> 
                            <i class="bi-github"/> frontend
                        </ExternalLink>
                    </div>
                </div>
            </div>
        </div>
    );
}