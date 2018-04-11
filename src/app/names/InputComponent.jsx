import React from 'react';
import { FormGroup, ControlLabel, FormControl
  ,Button, InputGroup, Label } from 'react-bootstrap';
import PropTypes from 'prop-types';

const InputComponent = ({ name, label, onSubmitForm
  , onChangeForm, onCancelEdit, isLoadingUpdate }) => (
  <form onSubmit={onSubmitForm}>
    <FormGroup>
      <Label style={{padding: '4px 12px'}}>Name</Label>
      <InputGroup>  
        <FormControl type="text" placeholder="Write a name..." 
          onChange={onChangeForm} value={name} 
          style={{borderRadius: '5px', marginTop: '7px'}} />
        <InputGroup.Button>
          <Button bsStyle="primary" type="submit" 
            style={{width: '120px', marginLeft: '15px', borderRadius: '5px', marginTop: '7px'}} 
            disabled={name.length===0 || isLoadingUpdate}>
            {label}
          </Button>
          {label === 'Edit' &&
            <Button style={{marginLeft: '2px', borderRadius: '5px', marginTop: '7px'}}  onClick={onCancelEdit}>Cancel</Button>
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
