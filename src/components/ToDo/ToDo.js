import "./ToDo.css";

import React, { useContext, useState, useEffect } from "react";
import AuthContext from "context/auth";
import apiClient from "services/apiClient";
import { useParams } from 'react-router-dom';

// Has the list of subtabs and tasks

export default function ToDo() {

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

    }, [setSubtabs, user, authenticated]); // subtabs


    return (
        <div className="ToDo">
            This is an example of using .overflow-auto on an element with set width and height dimensions. By
            design, this content will vertically scroll. This is an example of using .overflow-auto on an element with set width and height dimensions. By
            design, this content will vertically scroll. This is an example of using .overflow-auto on an element with set width and height dimensions. By
            design, this content will vertically scroll. This is an example of using .overflow-auto on an element with set width and height dimensions. By
            design, this content will vertically scroll. This is an example of using .overflow-auto on an element with set width and height dimensions. By
            design, this content will vertically scroll. This is an example of using .overflow-auto on an element with set width and height dimensions. By
            design, this content will vertically scroll. This is an example of using .overflow-auto on an element with set width and height dimensions. By
            design, this content will vertically scroll. This is an example of using .overflow-auto on an element with set width and height dimensions. By
            design, this content will vertically scroll. This is an example of using .overflow-auto on an element with set width and height dimensions. By
            design, this content will vertically scroll.ßåß
        </div>
    );
}