import "./Footer.css"

import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="Footer">
            <div class="row align-items-center">
                <div id="footer-col-l" class="col-md-4">
                    <h5>Let's get acquainted_</h5>
                    <div class="footer-socials">
                        <h4>
                            {/* <a role="link" aria-label="Navigate to Stephanie's LinkedIn Page"
                                href="https://www.linkedin.com/in/stephanie-de-leon-a902b717a/ " target="_blank "
                                rel="noopener noreferrer "><i class="bi bi- bi-linkedin"></i></a>
                            <a role="link" aria-label="Send an Email to Love, Panini"
                                href="mailto:withlovepanini@gmail.com " target="_blank " rel="noopener noreferrer "><i
                                    class="bi bi-envelope"></i></a>
                            <a role="link" aria-label="Navigate to Stephanie's GitHub Page"
                                href="https://github.com/stephaniedeleon " target="_blank " rel="noopener noreferrer "><i
                                    class="bi bi-github"></i></a> */}
                        </h4>
                    </div>
                </div>
                <div id="footer-col-m" class="col-md-4">
                    <Link to="/about">
                        {/* <img src="images/favicon.ico" alt="Love, Panini small logo" style="max-height: 3.2rem;">
                        <img class="signature" src="images/closing.png" alt="Love, Panini signature"
                            style="max-height: 4.3rem;"> */}
                        <div className="credits">Coded with care by G.A.P.</div>

                    </Link>
                </div>
                <div id="footer-col-r" class="col-md-4">
                    <h5>Looking for more?_</h5>
                    <div class="footer-links">
                        {/* <a role="navigation" aria-label="Go to about page" href="pages/about.html">About</a>
                        <a role="navigation" aria-label="Go to blog page for articles" href="pages/blog.html">The Blog</a>
                        <a role="navigation" aria-label="Go to projects page" href="pages/projects.html">Projects</a> */}
                    </div>
                </div>
            </div>
        </div>
    );
}