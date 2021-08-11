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

    const name = user?.firstName?.charAt(0).toUpperCase() + user?.firstName?.substring(1)
    const welcome = "Welcome " + name + "!";
  
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
                    <h4>What are you "crumbling" today?</h4>
                </div>
            </div>

            <div className="home-area">
                <div className="title">
                    <h3>{name + `'s MainTabs`}</h3>
                    { maintabs.length === 0 ? (
                        <>
                        </>
                    ) : (
                        <>
                            <Button className="addBtn" onClick={() => setModalShow(true)}>
                                Add MainTab
                            </Button>
                        </>
                    ) }

                    <AddMainTab
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </div>

                <div>
                    { maintabs.length === 0 ? (
                        <>
                            <div className="home-default">
                                <div className="default-message">                            
                                    Add a MainTab to get started!
                                </div>
                                <div>
                                    <Button onClick={() => setModalShow(true)} className="addBtn">
                                        Add MainTab
                                    </Button>
                                </div>
                            </div>

                            <AddMainTab
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            />
                        </>
                    ) : (
                        <>
                            <div className="maintabs">
                                {maintabs.map((maintab) => (
                                    <MainTab key={maintab.id} maintab={maintab} />
                                ))}
                            </div>
                        </>
                    ) }
                </div>
            </div>
        </div>
    );
}