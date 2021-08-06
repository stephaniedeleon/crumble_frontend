import "./Home.css";

import { Button } from "react-bootstrap";
import { MainTab, AddMainTab } from "components";
import React, { useContext, useState, useEffect } from "react";
import AuthContext from "context/auth";
import GlobalContext from "context/global";
import apiClient from "services/apiClient";


export default function Home() {

    const { user, authenticated } = useContext(AuthContext);
    const { maintabs, setMaintabs } = useContext(GlobalContext);

    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const welcome = "Welcome " + user?.firstName + "!";
  
    //fetches maintabs
    useEffect(() => {
        const fetchMaintabs = async () => {
            setIsFetching(true);
      
            const { data, error } = await apiClient.listMaintabs();
            if(data) setMaintabs(data?.maintabs);
            if(error) setError(error);
      
            setIsFetching(false);
        }
    
        if(authenticated) fetchMaintabs();

    }, [setMaintabs, user, authenticated]);


    //method to show modal for adding maintab...
    const [modalShow, setModalShow] = useState(false);

    return (
        <div className="Home">
            <div className="parallax">
                <div className="caption">
                    <h3>{welcome}</h3>
                    <h4>What's your focus today?</h4>
                </div>
            </div>

            <div className="home-area">
                <div className="title">
                    <h3>{user?.firstName + `'s MainTabs`}</h3>
                    <Button className="addBtn" onClick={() => setModalShow(true)}>
                        Add MainTab
                    </Button>

                    <AddMainTab
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </div>

                <div className="maintabs">
                    { maintabs.length === 0 ? (
                        <>
                            <h2 className="error-message"> No Maintabs Available! </h2>
                            <Button onClick={() => setModalShow(true)}>
                                Add MainTab
                            </Button>

                            <AddMainTab
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            />
                        </>
                    ) : (
                        <>
                            {maintabs.map((maintab) => (
                                <MainTab key={maintab.id} maintab={maintab} />
                            ))}
                        </>
                    ) }
                    
                </div>
            </div>
        </div>
    );
}