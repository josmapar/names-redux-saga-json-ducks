import React from 'react';
import { FormGroup, ControlLabel, FormControl
  ,Button, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';


const SearchComponent = ({ onSubmitSearch, search, onChangeSearch }) => (
  <form onSubmit={onSubmitSearch}>
    <FormGroup>
      <InputGroup>  
        <FormControl type="text" onChange={onChangeSearch} 
            placeholder="Search a name..." value={search} />
        <InputGroup.Button>
          <Button type="submit">Search</Button>
        </InputGroup.Button>
      </InputGroup>
    </FormGroup>
  </form>
);

SearchComponent.propTypes = {
  onSubmitSearch: PropTypes.func.isRequired,
  onChangeSearch: PropTypes.func.isRequired,
  search: PropTypes.string,
};

export default SearchComponent;
