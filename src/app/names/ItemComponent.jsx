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
    <td style={{verticalAlign: 'middle'}}>{name}</td>
    <td style={{verticalAlign: 'middle'}}>{createdAt}</td>
    <td style={{verticalAlign: 'middle'}}>{updatedAt}</td>
    <td style={{verticalAlign: 'middle'}}>
      <div>
        {!isLoadingUpdate ?
          <div>
            <a style={{cursor: 'pointer', fontSize: '2em', marginRight: '10px'}} onClick={() => onEdit(value)}>
              <Glyphicon glyph="edit" />
            </a>
            {' '}
            {modeForm !== 'Edit' &&
              <a style={{cursor: 'pointer', fontSize: '2em'}} onClick={() => onDelete(value)}>
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
