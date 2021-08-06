import "./TimerAlert.css"
import { Button, Modal } from "react-bootstrap";


export default function TimerAlert (props) {

    const timerStatus = props.paginationButtonsStatus;

    const pomodoro = timerStatus[0][1]; //returns if pomodoro is true or false

    const takeShort = () => {
        props.onHide();

        props.togglePaginationBtn("shortBreak");
        props.startTimer();
    }

    const takeLong = () => {
        props.onHide();

        props.togglePaginationBtn("longBreak");
        props.startTimer();
    }

    const startPomodoro = () => {
        props.onHide();

        props.togglePaginationBtn("pomodoro");
        props.startTimer();
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
                        <Modal.Footer>
                            <div className="modal-button breaktime">
                                <Button onClick={props.onHide} className="button exit">
                                    I'm done for today
                                </Button>
                                <Button onClick={startPomodoro} className="button">
                                    Skip break
                                </Button>
                                <Button onClick={takeShort} className="button">
                                    Take a short break
                                </Button>
                                <Button onClick={takeLong} className="button">
                                    Take a long break
                                </Button>
                            </div>
                        </Modal.Footer>
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
                        <Modal.Footer>
                            <div className="modal-button">
                                <Button onClick={props.onHide} className="button">
                                    I'm done for today
                                </Button>
                                <Button onClick={startPomodoro} className="button">
                                    Start working
                                </Button>
                            </div>
                        </Modal.Footer>
                    </>
                )}
            </div>
        </Modal>
    )
}