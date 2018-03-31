import React from 'react';
import { FormGroup, ControlLabel, FormControl
  ,Button, InputGroup } from 'react-bootstrap';

const SearchComponent = () => (
  <form onSubmit={(e)=>{e.preventDefault()}}>
    <FormGroup>
      <InputGroup>  
        <FormControl type="text" placeholder="Search a name..." />
        <InputGroup.Button>
          <Button type="submit">Search</Button>
        </InputGroup.Button>
      </InputGroup>
    </FormGroup>
  </form>
);

export default SearchComponent;
