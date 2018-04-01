import React from 'react';
import { Table, Button, Glyphicon, Pagination } from 'react-bootstrap';
import { flattenProp, branch, renderComponent } from 'recompose';
import LoadingComponent from './LoadingComponent';

const ItemComponent = flattenProp('value')(
  ({ name, createdAt, updatedAt }) => (
  <tr>
    <td>{name}</td>
    <td>{createdAt}</td>
    <td>{updatedAt}</td>
    <td>
      <a><Glyphicon glyph="edit" /></a>
      {' '}
      <a><Glyphicon glyph="trash" /></a>
    </td>
  </tr>
));

const enhance = branch(({ isLoading }) => isLoading,
  renderComponent(LoadingComponent)); 
const TableComponent = enhance(( { items } ) => (
  <div>
    <Table responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((value, index) => (
          <ItemComponent key={index} value={value} />
        ))}         
      </tbody>
    </Table>
    <Pagination>
      <Pagination.Prev>{'<-'} Previous</Pagination.Prev>
      <Pagination.Item active>{1}</Pagination.Item>
      <Pagination.Item>{2}</Pagination.Item>
      <Pagination.Item>{3}</Pagination.Item>
      <Pagination.Item>{4}</Pagination.Item>
      <Pagination.Ellipsis />
      
      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Next>Next {'->'}</Pagination.Next>
    </Pagination>      
  </div>
));

export default TableComponent;
