import React from 'react';
import { FormGroup, ControlLabel, FormControl
  ,Button, InputGroup } from 'react-bootstrap';

const InputComponent = () => (
  <form onSubmit={(e)=>{e.preventDefault()}}>
    <FormGroup>
      <ControlLabel>Name</ControlLabel>
      <InputGroup>  
        <FormControl type="text" placeholder="Write a name..." />
        <InputGroup.Button>
          <Button type="submit">Update</Button>
        </InputGroup.Button>
      </InputGroup>
    </FormGroup>
  </form>
);

export default InputComponent;
