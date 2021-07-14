import "./MainTab.css"

import { Card, CloseButton } from "react-bootstrap";
import { formatDate } from "utils/format";


export default function MainTab({ key, maintab }) {

    //key - maintab.id

    // //deletes a maintab to list of maintabs
    // const deleteMaintab = (maintab) => {
    //     setMaintabs((oldMaintabs) => [newMaintab, ...oldMaintabs])
    // }

    // const handleOnDelete = async (event) => {

    //     event.preventDefault();
    //     setIsLoading(true);
    //     setErrors((e) => ({ ...e, form: null }));

    //     const { data, error } = await apiClient.createMaintab({ 
    //         name: form.name,
    //     });

    //     if (error) {
    //         setErrors((e) => ({ ...e, form: error }));
    //     } else {
    //         setErrors((e) => ({ ...e, form: null }));
    //         addMaintab(data);
    //     } 

    //     setIsLoading(false);
    // }

    return (
        <div className="MainTab">
            <div className="card">
                <Card className="maintab">
                    <CloseButton /> 
                    {/* onClick={handleOnDelete} */}
                    <Card.Body>
                        <Card.Title className="maintabName">{maintab.name}</Card.Title>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}