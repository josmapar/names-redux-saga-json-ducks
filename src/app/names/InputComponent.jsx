import React from 'react';
import { FormGroup, ControlLabel, FormControl
  ,Button, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

const InputComponent = ({ name, label, onSubmitForm
  , onChangeForm, onCancelEdit, isLoadingUpdate }) => (
  <form onSubmit={onSubmitForm}>
    <FormGroup>
      <ControlLabel>Name</ControlLabel>
      <InputGroup>  
        <FormControl type="text" placeholder="Write a name..." 
          onChange={onChangeForm} value={name}/>
        <InputGroup.Button>
          <Button type="submit" disabled={name.length===0 || isLoadingUpdate}>{label}</Button>
          {label === 'Edit' &&
            <Button onClick={onCancelEdit}>Cancel</Button>
          }
        </InputGroup.Button>
      </InputGroup>
    </FormGroup>
  </form>
);
InputComponent.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  onChangeForm: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
  isLoadingUpdate: PropTypes.bool.isRequired
};
export default InputComponent;
