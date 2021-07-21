import "./ToDo.css";

import { Button } from 'react-bootstrap';
import { AddSubTab, SubTab } from 'components';
import React, { useContext, useState, useEffect } from "react";
import AuthContext from "context/auth";
import apiClient from "services/apiClient";
import { useParams } from 'react-router-dom';

// Has the list of subtabs and tasks

export default function ToDo({ directory, setDirectory }) {

    const { subtabs, user, authenticated, setSubtabs } = useContext(AuthContext);

    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const { mainId, subId } = useParams();

    // fetches subtabs
    useEffect(() => {
        const fetchSubtabs = async () => {
            setIsFetching(true);

            let result;
            
            if (parseInt(subId) === 0) {
                result = await apiClient.listSubtabsByMain(parseInt(mainId));
            } else {
                result = await apiClient.listSubtabsBySubtab(parseInt(subId));
            }
            
            const { data, error } = result;

            if(data) setSubtabs(data.subtabs);
            if(error) setError(error);
      
            setIsFetching(false);
        }
    
        if(authenticated) fetchSubtabs();

    }, [setSubtabs, user, authenticated, mainId, subId]); // subtabs

    const [modalShow, setModalShow] = useState(false);

    return (
        <div className="ToDo">
            <div className="title">
                <Button variant="outline-primary" onClick={() => setModalShow(true)}>
                    Add Subtab
                </Button>

                <AddSubTab
                    mainId={mainId}
                    subId={subId}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    directory={directory} setDirectory={setDirectory}
                />
            </div>
            <br />
            <br />
            <div className="subtabs">
                {subtabs.map((subtab) => (
                    <SubTab key={subtab.id} subtab={subtab} mainId={mainId} />
                ))}
            </div>
        </div>
    );
}