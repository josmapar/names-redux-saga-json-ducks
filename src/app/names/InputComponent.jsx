import React from 'react';
import { FormGroup, FormControl
  ,Button, InputGroup, Label } from 'react-bootstrap';
import PropTypes from 'prop-types';

const InputComponent = ({ name, label, onSubmitForm
  , onChangeForm, onCancelEdit, isLoadingUpdate }) => (
  <form onSubmit={onSubmitForm}>
    <FormGroup>
      <Label className="names-label-input">Name</Label>
      <InputGroup>  
        <FormControl type="text" placeholder="Write a name..." 
          onChange={onChangeForm} value={name} className="names-input" />
        <InputGroup.Button>
          <Button bsStyle="primary" type="submit" className="names-button-update"
            disabled={name.length===0 || isLoadingUpdate}>
            {label}
          </Button>
          {label === 'Edit' &&
            <Button className="names-button-cancel" onClick={onCancelEdit}>Cancel</Button>
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
