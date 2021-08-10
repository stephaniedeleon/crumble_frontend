import "./ViewProfile.css"
import { Modal, Button } from "react-bootstrap";


export default function ViewProfile (props) {

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
                {props.text}
            </Modal.Body>

        </Modal>
    )
}