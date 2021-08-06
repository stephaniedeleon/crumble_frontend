import "./TimerAlert.css"
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function TimerAlert (props) {

    const navigate = useNavigate();

    const timerStatus = props.paginationButtonsStatus;

    const pomodoro = timerStatus[0][1]; //returns if pomodoro is true or false

    const toTimer = () => {
        props.onHide();
        navigate("/timer");
    }

    return (
        <Modal
            {...props}
            keyboard={false}
            className="timerAlert"
        >
            <div className="modal-area">

                { pomodoro ? (
                    <>                
                        <Modal.Header closeButton>
                            <Modal.Title><i className="bi-alarm"></i> &nbsp;Break Time! </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Your pomodoro has finished.</p>
                            <p>Enjoy your break!</p>
                        </Modal.Body>
                    </>
                ) : ( 
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title><i className="bi-alarm"></i> &nbsp;Grind Time! </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Your break has finished.</p>
                            <p>It's time to get back to work!</p>
                        </Modal.Body>
                    </>
                )}

                <Modal.Footer>
                    <div className="modal-button">
                        <Button onClick={props.onHide} className="button">
                            I'm done working today
                        </Button>
                        <Button onClick={toTimer} className="button">
                            Okay, take me to timer
                        </Button>
                    </div>
                </Modal.Footer>
            </div>
        </Modal>
    )
}