import React from 'react';
import { FormGroup, FormControl
  ,Button, InputGroup, Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';


const SearchComponent = ({ onSubmitSearch, search, onChangeSearch }) => (
  <form onSubmit={onSubmitSearch}>
    <FormGroup>
      <InputGroup>  
        <FormControl type="text" onChange={onChangeSearch} style={{borderRadius: '5px'}}
            placeholder="Search for a name..." value={search} />
        <InputGroup.Button>
          <Button bsStyle="success" type="submit" 
            style={{width: '120px', marginLeft: '15px', borderRadius: '5px'}}>
            <Glyphicon glyph="search" style={{marginRight: '10px'}} />
            Search
          </Button>
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
