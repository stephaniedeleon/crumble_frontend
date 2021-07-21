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

    const { mainId } = useParams();

    // fetches subtabs
    useEffect(() => {
        const fetchSubtabs = async () => {
            setIsFetching(true);
      
            const { data, error } = await apiClient.listSubtabsByMain(parseInt(mainId));
            if(data) setSubtabs(data.subtabs);
            if(error) setError(error);
      
            setIsFetching(false);
        }
    
        if(authenticated) fetchSubtabs();

    }, [setSubtabs, user, authenticated, mainId, directory]); // subtabs

    const [modalShow, setModalShow] = useState(false);

    return (
        <div className="ToDo">
            <div className="title">
                <Button variant="outline-primary" onClick={() => setModalShow(true)}>
                    Add Subtab
                </Button>

                <AddSubTab
                    mainId={mainId}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    directory={directory} setDirectory={setDirectory}
                />
            </div>
            <br />
            <br />
            <div className="subtabs">
                {subtabs.map((subtab) => (
                    <SubTab key={subtab.id} subtab={subtab} />
                ))}
            </div>
        </div>
    );
}