import React from 'react';
import { Table, Button, Glyphicon
  , Pagination } from 'react-bootstrap';
import { flattenProp, branch, renderComponent
  , compose, pure } from 'recompose';
import LoadingComponent from './LoadingComponent';
import PaginationComponent from './PaginationComponent';

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

const ItemComponent = flattenProp('value')(
  ({ name, createdAt, updatedAt
    , value, onEdit, onDelete }) => (
  <tr>
    <td>{name}</td>
    <td>{createdAt}</td>
    <td>{updatedAt}</td>
    <td>
      <a onClick={() => onEdit(value)}><Glyphicon glyph="edit" /></a>
      {' '}
      <a onClick={() => onDelete(value)}><Glyphicon glyph="trash" /></a>
    </td>
  </tr>
));

const enhance = compose(
  branch(({ isLoading }) => isLoading,
    renderComponent(LoadingComponent)),
  pure
); 
const TableComponent = ( { items, onEdit, onDelete
, actPag, totalPags, onChangePag
, onPrev, onNext, order
, onChangeOrd } ) => (
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
            onEdit={onEdit} onDelete={onDelete} />
        ))}         
      </tbody>
    </Table>
    <PaginationComponent actPag={actPag} totalPags={totalPags}
      onChangePag={onChangePag} onPrev={onPrev} onNext={onNext} />
  </div>
);

export default enhance(TableComponent);
