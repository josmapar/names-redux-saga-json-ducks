import React from 'react';
import { Table } from 'react-bootstrap';
import { branch, renderComponent
  , compose, pure } from 'recompose';
import PropTypes from 'prop-types';
import LoadingComponent from './LoadingComponent';
import PaginationComponent from './PaginationComponent';
import ItemComponent from './ItemComponent';

const colHeader = (col, field, order) => {
  if(order !== null && order.field === field) {
    if(order.type === 'asc') 
      return `${col} ▲`;
    else 
      return `${col} ▼`;
  } else {
    return col;
  }
};

const enhance = compose(
  branch(({ isLoading }) => isLoading,
    renderComponent(LoadingComponent)),
  pure
); 
const TableComponent = ( { items, onEdit, onDelete
, actPag, totalPags, onChangePag
, onPrev, onNext, order
, onChangeOrd, isLoadingUpdate, modeForm } ) => (
  <div>
    <Table responsive>
      <thead>
        <tr>
          <th style={{cursor: 'pointer'}} 
            onClick={() => onChangeOrd('name')}>
            {colHeader('Name', 'name', order)}
          </th>
          <th style={{cursor: 'pointer'}}
            onClick={() => onChangeOrd('createdAt')}>
            {colHeader('Created At', 'createdAt', order)}
          </th>
          <th style={{cursor: 'pointer'}}
            onClick={() => onChangeOrd('updatedAt')}>
            {colHeader('Updated At', 'updatedAt', order)}
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((value, index) => (
          <ItemComponent key={index} value={value} 
            onEdit={onEdit} onDelete={onDelete}
            isLoadingUpdate={isLoadingUpdate} 
            modeForm={modeForm} />
        ))}         
      </tbody>
    </Table>
    <PaginationComponent style={{float: 'right'}} actPag={actPag} totalPags={totalPags}
      onChangePag={onChangePag} onPrev={onPrev} onNext={onNext} />
  </div>
);
TableComponent.propTypes = {
  items: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  actPag: PropTypes.number.isRequired,
  totalPags: PropTypes.number.isRequired,
  onChangePag: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  order: PropTypes.object,
  onChangeOrd: PropTypes.func.isRequired,
  isLoadingUpdate: PropTypes.bool.isRequired,
  modeForm: PropTypes.oneOf(['Create', 'Edit']).isRequired,
  isLoading: PropTypes.bool.isRequired
};
export default enhance(TableComponent);
