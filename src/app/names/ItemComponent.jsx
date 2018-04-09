import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';
import { compose, flattenProp } from 'recompose';
import LoadingComponent from './LoadingComponent';

const enhance = compose(
  flattenProp('value')
);

const ItemComponent = ({
  name, createdAt, updatedAt
  , value, onEdit, onDelete
  , isLoadingUpdate, modeForm 
}) => (
  <tr>
    <td>{name}</td>
    <td>{createdAt}</td>
    <td>{updatedAt}</td>
    <td>
      <div>
        {!isLoadingUpdate ?
          <div>
            <a style={{cursor: 'pointer'}} onClick={() => onEdit(value)}>
              <Glyphicon glyph="edit" />
            </a>
            {' '}
            {modeForm !== 'Edit' &&
              <a style={{cursor: 'pointer'}} onClick={() => onDelete(value)}>
                <Glyphicon glyph="trash" />
              </a>
            }
          </div>
        :
          <LoadingComponent className='' styleImg={{width: '25px'}} />
        }
      </div>
    </td>
  </tr>
);
ItemComponent.propTypes = {
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isLoadingUpdate: PropTypes.bool.isRequired,
  modeForm: PropTypes.oneOf(['Create', 'Edit']).isRequired
};
export default enhance(ItemComponent);
