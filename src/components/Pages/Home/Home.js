import "./Home.css";
import { PageHeader, MainTab } from "components";
import { Link } from 'react-router-dom';
import React, { useContext, useState, useEffect } from "react";
import AuthContext from "context/auth";
import apiClient from "services/apiClient";

// Has the list of maintabs

export default function Home({ setMaintabs }) {

    const { maintabs, user, authenticated } = useContext(AuthContext);

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

      fetchMaintabs();
  
    }, [setMaintabs, user, authenticated]); 


    return (
        <div className="Home">
            <PageHeader sectionName={welcome}/>

            <div className="home-area">
            <div className="title">
                <h3>Your MainTabs...</h3>
                <Link to='/maintabs/create'>Add MainTab</Link>
            </div>
            <br/>
            <br/>
            <div className="maintabs">
                {maintabs.map((maintab) => (
                    <MainTab key={maintab.id} maintab={maintab} />
                ))}
            </div>
            </div>
        </div>
    );
}