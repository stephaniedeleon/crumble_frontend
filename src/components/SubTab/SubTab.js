import "./SubTab.css"

import { InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
 
export default function SubTab (props) {

    return (
        <div className="SubTab">
            <InputGroup className="mb-3">
                <InputGroup.Checkbox />
                <FormControl as={Link} to={`/home/${props.mainId}/${props.subtab.id}`}> {props.subtab.name} </FormControl>
            </InputGroup>
        </div>
    );
} 