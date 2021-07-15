import "./MainTab.css"

import { Card, CloseButton, Popover, OverlayTrigger, Button } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import AuthContext from "context/auth";
import apiClient from "services/apiClient";


export default function MainTab({ key, maintab }) {

    const { maintabs, setMaintabs, setErrors, setIsLoading} = useContext(AuthContext);

    //deletes a maintab to list of maintabs
    const deleteMaintab = (deletedId) => {
        setMaintabs(maintabs.filter(filteredMaintab => filteredMaintab.id !== deletedId))
    }

    const handleOnDelete = async (event) => {

        event.preventDefault();
        setIsLoading(true);
        setErrors((e) => ({ ...e, form: null }));

        const { data, error } = await apiClient.deleteMaintab(maintab.id);

        if (error) {
            setErrors((e) => ({ ...e, form: error }));
        } else {
            setErrors((e) => ({ ...e, form: null }));
            deleteMaintab(maintab.id);
        }

        setIsLoading(false);
    }

    return (
        <div className="MainTab">
            <div className="card">
                <Link to={`/home/${maintab.id}`} >
                    <Card className="maintab">
                        <CloseButton onClick={handleOnDelete} /> 
                        <Card.Body>
                            <Card.Title className="maintabName">{maintab.name}</Card.Title>
                        </Card.Body>
                    </Card>
                </Link>
            </div>
        </div>
    );
}