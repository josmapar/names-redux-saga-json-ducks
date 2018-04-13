import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';
import { compose, flattenProp, mapProps } from 'recompose';
import moment from 'moment';
import LoadingComponent from './LoadingComponent';

function convertDate(date) {
  return moment(date).format('MM/DD/YYYY');
}

const enhance = compose(
  flattenProp('value'),
  mapProps(props => 
    ({...props, 
      createdAt: convertDate(props.createdAt),
      updatedAt: convertDate(props.updatedAt)
    })
  )
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
            <a className="names-link-edit" onClick={() => onEdit(value)}>
              <Glyphicon glyph="edit" />
            </a>
            {' '}
            {modeForm !== 'Edit' &&
              <a className="names-link-delete" onClick={() => onDelete(value)}>
                <Glyphicon glyph="trash" />
              </a>
            }
          </div>
        :
          <div><LoadingComponent className='' styleImg={{width: '35px'}} /></div>
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
