import "./TimerAlert.css"
import { Button, Modal } from "react-bootstrap";



export default function TimerAlert (props) {

    return (
        <Modal
            {...props}
            keyboard={false}
            className="timerAlert"
        >
            <div className="modal-area">
                <Modal.Header closeButton>
                    <Modal.Title>Time's Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-button">
                        <Button onClick={props.onHide} className="button">
                            Close
                        </Button>
                    </div>
                </Modal.Body>
            </div>
        </Modal>
    )
}