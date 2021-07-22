import "./SubTab.css"

import { InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from "context/auth";
import { useContext } from "react";
 
export default function SubTab (props) {

    const { digIntoTab } = useContext(AuthContext)

    return (
        <div className="SubTab">
            <InputGroup className="mb-3">
                <InputGroup.Checkbox />
                <FormControl as={Link} to={`/home/${props.mainId}/${props.subtab.id}`} onClick={() => digIntoTab(props.subtab.id)} > {props.subtab.name} </FormControl>
            </InputGroup>
        </div>
    );
} 