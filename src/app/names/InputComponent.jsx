import React from 'react';
import { FormGroup, ControlLabel, FormControl
  ,Button, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

const InputComponent = ({ name, label, onSubmitForm, onChangeForm }) => (
  <form onSubmit={onSubmitForm}>
    <FormGroup>
      <ControlLabel>Name</ControlLabel>
      <InputGroup>  
        <FormControl type="text" placeholder="Write a name..." 
          onChange={onChangeForm} value={name}/>
        <InputGroup.Button>
          <Button type="submit">{label}</Button>
        </InputGroup.Button>
      </InputGroup>
    </FormGroup>
  </form>
);

export default InputComponent;
