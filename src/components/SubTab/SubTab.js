import "./SubTab.css"

import { useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from "context/global";
import { useContext } from "react";
import { UpdateSubtab } from "components";
import apiClient from "services/apiClient";
 
export default function SubTab(props) {

    const { setSubtabs } = useContext(GlobalContext);


    const [completed, setCompleted] = useState(props.subtab.completed);

    const handleChange = async (event) => {

        let dbData;

        if (completed) dbData = await apiClient.unmarkSubtab(props.subtab.id);
        else dbData = await apiClient.markSubtab(props.subtab.id);
        setCompleted(!completed);

        const updatedSubtab = dbData.data.subtab

        setSubtabs(oldSubtabs => oldSubtabs.map(oldSubtab => oldSubtab.id === updatedSubtab.id ? updatedSubtab : oldSubtab))

    }

    
    const { digIntoTab } = useContext(GlobalContext);

    //method to show modal for viewing or editing...
    const [editModalShow, setEditModalShow] = useState(false);

    const subtab = props.subtab;

    return (
        <div className="SubTab">

            <div className="subtab">
                <label className="container">
                    <input type="checkbox" checked={completed} onChange={handleChange} />
                    <span className="checkmark"></span>
                    <div className="details">
                        <i className="bi-folder"/>
                        <Link to={`/home/${props.mainId}/${subtab.id}`} onClick={() => digIntoTab(subtab.id)} className="name" >
                            {subtab.name}
                        </Link>
                    </div>
                    <div className="priority">{subtab.priority}</div>
                </label>

                <div className="actions" onClick={() => setEditModalShow(true)}>                            
                    <i className= "bi-three-dots"></i>
                </div>
            </div>

            <UpdateSubtab
                show={editModalShow}
                onHide={() => setEditModalShow(false)}
                subtab={subtab}
                updateDirectory={props.updateDirectory}
            />

        </div>
    );
} 