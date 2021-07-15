import "./LandingPage.css"
import { PageHeader } from "components";

export default function LandingPage() {

    const landing = "Landing Page"

    return (
        <div className="LandingPage">
            <PageHeader sectionName={landing} />
        </div>
    );
}