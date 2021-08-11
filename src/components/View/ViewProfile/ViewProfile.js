import "./ViewProfile.css"
import { Modal, Button } from "react-bootstrap";
import { gevork, stephanie, abhiraj } from "components";


export default function ViewProfile (props) {

    console.log(props.pic)

    let pic;
    let name;

    switch(props.name) {
        case "Stephanie De Leon":
            pic = stephanie;
            name="Stephanie";
            break;
        case "Gevork Manukyan":
            pic = gevork;
            name="Gevork";
            break;
        case "Abhiraj Chatterjee":
            pic =abhiraj;
            name="Abhiraj";
            break;
        default:
            break;
    }

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            className="ViewProfile"
            aria-labelledby="View Person's Profile"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {props.name}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="pic">      
                    <img src={pic} alt={props.name} className="profile-pic"/>

                    <h2>
                        {name}
                    </h2>
                </div>
                <div className="profile">                
                    {props.text}
                </div>
            </Modal.Body>

        </Modal>
    )
}