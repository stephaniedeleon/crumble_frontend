import "./Home.css";

import { Button } from "react-bootstrap";
import { PageHeader, MainTab, AddMainTab, Footer } from "components";
import React, { useContext, useState, useEffect } from "react";
import AuthContext from "context/auth";
import apiClient from "services/apiClient";

// Has the list of maintabs

export default function Home() {

    const { maintabs, user, authenticated, setMaintabs } = useContext(AuthContext);

    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const welcome = "Welcome " + user?.firstName + "!";
  
    //fetches maintabs
    useEffect(() => {
        const fetchMaintabs = async () => {
            setIsFetching(true);
      
            const { data, error } = await apiClient.listMaintabs();
            if(data) setMaintabs(data.maintabs);
            if(error) setError(error);
      
            setIsFetching(false);
        }
    
        if(authenticated) fetchMaintabs();

    }, [setMaintabs, user, authenticated]); //maintabs




    //method to show modal for adding maintab...
    const [modalShow, setModalShow] = useState(false);

    return (
        <div className="Home">
            <PageHeader sectionName={welcome}/>

            <div className="home-area">
                <div className="title">
                    <h3>Your MainTabs...</h3>
                    <Button variant="outline-primary" onClick={() => setModalShow(true)}>
                        Add MainTab
                    </Button>

                    <AddMainTab
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </div>
                <br/>
                <br/>
                <div className="maintabs">
                    {maintabs.map((maintab) => (
                        <MainTab key={maintab.id} maintab={maintab} />
                    ))}
                </div>
            </div>
            
            <Footer />
        </div>
    );
}