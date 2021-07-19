import "./SubTab.css"

import { InputGroup, FormControl } from 'react-bootstrap';
 
export default function SubTab (props) {

    return (
        <div className="SubTab">
            <InputGroup className="mb-3">
                <InputGroup.Checkbox />
                <FormControl placeholder={props.subtab.name} disabled />
            </InputGroup>
        </div>
    );
} 