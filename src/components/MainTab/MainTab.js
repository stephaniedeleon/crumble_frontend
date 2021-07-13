import { formatDate } from "utils/format";
import "./MainTab.css"


export default function MainTab({ key, maintab }) {

    return (
        <div className="MainTab">
            <div className="card">
                <div className="title"><h3 className="name">{maintab.name}</h3></div>
                {/* <div className="details">
                    <div className="duration">
                    <p className="valueName">Duration</p>
                    <p className="value">{maintab.duration}</p>
                    </div>
                    <div className="intensity">
                    <p className="valueName">Intensity</p>
                    <p className="value">{maintab.intensity}/10</p>
                    </div>
                </div> */}
                <div className="extra_details">
                    <p className="createdAt">{formatDate(maintab.created_at)}</p>
                </div>
            </div>
        </div>
    );
}